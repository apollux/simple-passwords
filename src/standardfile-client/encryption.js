import _ from 'lodash';
import CryptoJS from 'crypto-js';
import invariant from 'invariant';

export function generateRandomBits(bits) {
  invariant(
    _.isInteger(bits) && bits % 8 === 0,
    'bits needs to be devidable by 8'
  );
  return CryptoJS.lib.WordArray.random(bits / 8).toString();
}

export function generateItemKeys() {
  const itemKey = generateRandomBits(512);
  return {
    itemKey,
    itemEncKey: itemKey.substring(0, itemKey.length / 2),
    itemAuthKey: itemKey.substring(itemKey.length / 2)
  };
}

export function encryptString(
  cleartext,
  uuid,
  encryptionKey,
  authenticationKey
) {
  invariant(_.isString(cleartext), 'cleartext needs to be a string');
  invariant(!_.isNil(uuid), 'uuid needs to be passed');
  invariant(_.isString(encryptionKey), 'encryptionKey needs to be set');
  invariant(_.isString(authenticationKey), 'authenticationKey needs to be set');

  const iv = generateRandomBits(128);
  const ciphertext = CryptoJS.AES
    .encrypt(cleartext, encryptionKey, {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    .toString();
  const stringToAuth = _.join(['002', uuid, iv, ciphertext], ':');
  const authHash = CryptoJS.HmacSHA256(
    stringToAuth,
    authenticationKey
  ).toString(CryptoJS.enc.Hex);

  const encryptedString = _.join(['002', authHash, uuid, iv, ciphertext], ':');
  return encryptedString;
}

export function decryptString(
  stringToDecrypt,
  expectedUuid,
  encryptionKey,
  authenticationKey
) {
  const components = _.split(stringToDecrypt, ':');
  if (components.length !== 5) {
    throw new Error('Decryption failed, invalid formatted string');
  }
  const version = components[0];
  const authHash = components[1];
  const uuid = components[2];
  const iv = components[3];
  const ciphertext = components[4];

  if (version !== '002') {
    throw new Error('protocol version mismatch');
  }

  if (expectedUuid !== uuid) {
    throw new Error(
      `Malformed item, expected uuid '${expectedUuid}' does not match '${uuid}'`
    );
  }

  const stringToAuth = _.join(['002', uuid, iv, ciphertext], ':');
  const localAuthHash = CryptoJS.HmacSHA256(
    stringToAuth,
    authenticationKey
  ).toString(CryptoJS.enc.Hex);

  if (localAuthHash !== authHash) {
    throw new Error('HMAC failed');
  }

  const cleartext = CryptoJS.AES.decrypt(ciphertext, encryptionKey, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return cleartext.toString(CryptoJS.enc.Utf8);
}
