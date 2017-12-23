import uuidv4 from 'uuid/v4';

import { encryptString, decryptString, generateItemKeys } from './encryption';

export class Item {
  constructor(data = {}) {
    this.uuid = data.uuid || uuidv4();
    this.content_type = data.content_type || null;
    this.created_at = data.created_at || new Date();
    this.updated_at = data.updated_at || null;
    this.content = data.content || null;
    // this.encryptedItemKey = null;
  }
}

export class ItemSerializer {
  constructor(masterKey, authenticationKey) {
    this._masterKey = masterKey;
    this._authenticationKey = authenticationKey;
  }

  serialize(item) {
    const { encryptedContent, encryptedItemKey } = this._encryptItemContent(
      item.content,
      item.uuid
    );

    return {
      uuid: item.uuid,
      content: encryptedContent,
      content_type: item.content_type,
      enc_item_key: encryptedItemKey,
      deleted: item.deleted,
      created_at: item.created_at
    };
  }

  deserialize(item) {
    const clearContent = this._decryptItemContent(
      item.content,
      item.uuid,
      item.enc_item_key
    );
    return new Item({ ...item, content: clearContent });
  }

  _encryptItemContent(cleartext, uuid) {
    const { itemKey, itemEncKey, itemAuthKey } = generateItemKeys();
    const encryptedContent = encryptString(
      cleartext,
      uuid,
      itemEncKey,
      itemAuthKey
    );

    const encryptedItemKey = encryptString(
      itemKey,
      uuid,
      this._masterKey,
      this._authenticationKey
    );

    return { encryptedContent, encryptedItemKey };
  }

  _decryptItemContent(encryptedContent, uuid, encryptedItemKey) {
    const itemKey = decryptString(
      encryptedItemKey,
      uuid,
      this._masterKey,
      this._authenticationKey
    );

    const itemEncKey = itemKey.substring(0, itemKey.length / 2);
    const itemAuthKey = itemKey.substring(itemKey.length / 2);

    const content = decryptString(
      encryptedContent,
      uuid,
      itemEncKey,
      itemAuthKey
    );

    return content;
  }
}
