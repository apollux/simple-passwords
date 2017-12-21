<template>
    <form>
    <div class="form-group">
        <label class="form-label" for="new-password-name">Name</label>
        <input class="form-input"
        id="new-password-name"
        type="text" 
        v-model="name"
        placeholder="Name" 
        v-on:keyup.enter="submit">

        <label class="form-label" for="new-password-username">Username</label>
        <input class="form-input"
        id="new-password-username"
        type="text" 
        v-model="username"
        placeholder="Username" 
        v-on:keyup.enter="submit">
        
        <label class="form-label" for="new-password-password">Password</label>
        <input class="form-input"
        id="new-password-password"
        type="password" 
        v-model="password"
        placeholder="Password" 
        v-on:keyup.enter="submit">

        <label class="form-label" for="new-password-url">Site</label>
        <input class="form-input"
        id="new-password-url"
        type="url" 
        v-model="url"
        placeholder="http://" 
        v-on:keyup.enter="submit">
    </div>
    <div class="input-group">
        <span class="btn btn-primary input-group-btn" v-on:click="save">Save</span>
        <button class="btn input-group-btn" v-on:click="cancel">Cancel</button>
    </div>
    </form>
</template>

<script>
import _ from 'lodash';
import { Item } from '../standardfile-client/item';
import PasswordItem from '../domain/PasswordItem';

export default {
  name: 'PasswordForm',
  components: {},
  data() {
    return { name: '', username: '', password: '', url: '' };
  },
  methods: {
    cancel() {},
    save() {
      try {
        const pw = new PasswordItem({
          name: this.name,
          username: this.username,
          password: this.password,
          url: this.url
        });

        const content = JSON.stringify(_.omit(pw, _.keys(new Item())));
        console.log(content);

        const itemToSync = new Item({
          uuid: pw.uuid,
          created_at: pw.createdAt,
          content_type: pw.contentType,
          content
        });
        this.standardfileClient.sync(itemToSync);
        this.done();
      } catch (e) {
        console.log(e);
      }
    },
    done() {
      this.name = '';
      this.username = '';
      this.password = '';
      this.url = '';
      this.$emit('closeMe');
    }
  },
  dependencies: ['standardfileClient']
};
</script>
