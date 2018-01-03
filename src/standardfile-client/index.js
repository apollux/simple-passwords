import _ from 'lodash';
import CryptoJS from 'crypto-js';
import sha1 from 'crypto-js/sha1';
import invariant from 'invariant';
import Rx from 'rxjs/Rx';
import { generateRandomBits } from './encryption';
import { ItemSerializer } from './item';
import Http from './http';

export default class StandardfileClient {
  constructor(apiUrl, injectables = {}) {
    this._token = null;
    this._syncToken = null;
    this._serverPassword = null;
    this._masterKey = null;
    this._authenticationKey = null;
    this._http = injectables.http || new Http(apiUrl);
    this._observer = null;

    const saveItemsStream = Rx.Observable.create(observer => {
      this._observer = observer;
    });

    // const triggerStream = Rx.Observable.of(null);
    this.observerable = Rx.Observable.merge(saveItemsStream)
      .flatMap(itemsToSync =>
        Rx.Observable.defer(() => this._sync(itemsToSync))
      )
      .concatMap(x => x);
  }

  async getAuthParams(email) {
    const data = await this._http.get('/auth/params', { email });

    return { salt: data.pw_salt, iterations: data.pw_cost };
  }

  async register(email, password) {
    const nonce = generateRandomBits(128);
    const salt = sha1(_.join([email, nonce], ':')).toString();
    const iterations = 5000;
    this._deriveKeys(password, salt, iterations);
    const response = await this._http.post('/auth', {
      email,
      password: this._serverPassword,
      pw_cost: iterations,
      pw_salt: salt,
      version: '002'
    });

    this._http.token = response.token;
    return response.user.token;
  }

  async signIn(email, password) {
    const { salt, iterations } = await this.getAuthParams(email);
    // TODO verify salt length and iterations

    this._deriveKeys(password, salt, iterations);
    const response = await this._http.post('/auth/sign_in', {
      email,
      password: this._serverPassword
    });

    this._http.token = response.token;
    return response.token;
  }

  async logout() {
    this._http.token = null;
  }

  sync(itemToSync) {
    invariant(this._observer, 'Observer should be set');
    this._observer.next(itemToSync);
  }

  async _sync(itemToSync) {
    let serializedItem = null;
    if (!_.isNil(itemToSync)) {
      const serializer = new ItemSerializer(
        this._masterKey,
        this._authenticationKey
      );
      serializedItem = serializer.serialize(itemToSync);
    }

    const response = await this._http.post('/items/sync', {
      items: [serializedItem],
      sync_token: this._syncToken
      // limit: 10
      // TODO implement scrolltoken
    });

    this._syncToken = response.sync_token;

    return this._flattenSyncedItems(response);
  }

  _deriveKeys(password, salt, iterations) {
    const key = CryptoJS.PBKDF2(password, salt, {
      keySize: 768 / 32,
      hasher: CryptoJS.algo.SHA512,
      iterations,
      json: true
    }).toString();
    this._serverPassword = key.substr(0, key.length / 3);
    this._masterKey = key.substr(key.length / 3, key.length / 3);
    this._authenticationKey = key.substr(key.length / 3 * 2, key.length / 3);

    invariant(_.isString(this._serverPassword), 'serverPassword should be set');
    invariant(_.isString(this._masterKey), 'masterKey should be set');
    invariant(
      _.isString(this._authenticationKey),
      'authenticationKey should be set'
    );
  }

  _flattenSyncedItems(response) {
    const serializer = new ItemSerializer(
      this._masterKey,
      this._authenticationKey
    );

    return _.concat(
      _.map(_.filter(response.retrieved_items, ['deleted', false]), item => ({
        action: 'add-or-update',
        item: serializer.deserialize(item)
      })),
      _.map(_.filter(response.saved_items, ['deleted', false]), item => ({
        action: 'saved',
        item: serializer.deserialize(item)
      })),
      _.map(
        _.filter(
          _.concat(response.retrieved_items, response.saved_items),
          'deleted'
        ),
        item => ({
          action: 'delete',
          item
        })
      )
    );
  }
}
