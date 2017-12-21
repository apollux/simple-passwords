import _ from 'lodash';
import invariant from 'invariant';
import { Item } from '../standardfile-client/item';

export default class PasswordItem extends Item {
  constructor(params) {
    super(params);

    invariant(_.isString(params.name), 'Name must be a string');
    invariant(_.isString(params.password), 'Password must be a string');

    this.contentType = 'password-item';
    this.name = params.name;
    this.username = params.username || null;
    this.password = params.password;
    this.url = params.url || null;
  }
}
