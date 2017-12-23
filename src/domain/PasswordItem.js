import _ from 'lodash';
import { Item } from '../standardfile-client/item';

export default class PasswordItem extends Item {
  constructor(params) {
    super(params);
    this.content_type = 'password-item';
    this.name = params.name;
    this.username = params.username || null;
    this.password = params.password;
    this.url = params.url || null;
  }

  toStandardItem() {
    const content = JSON.stringify(_.omit(this, _.keys(new Item())));

    return new Item({
      uuid: this.uuid,
      created_at: this.created_at,
      content_type: this.content_type,
      content
    });
    // TODO enc_item_key
  }
}
