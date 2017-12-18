<template>
  <div id="app" class="container">
    <div class="columns">
      <div class="column col-8 col-mx-auto"><h1>Simple Passwords</h1></div>
      <div class="column col-8 col-mx-auto">
        <div class="has-icon-right">
          <input type="text" class="form-input" placeholder="Search">
            <i class="form-icon icon icon-search"></i>
        </div>
        <div class="column col-6">
          <PasswordList />
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
                id="new-password-username"
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
              <button class="btn btn-primary input-group-btn" v-on:click="save">Save</button>
              <button class="btn input-group-btn">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Item } from './standardfile-client/item';
import PasswordList from './components/PasswordList';
export default {
  name: 'app',
  components: {
    PasswordList
  },
  data() {
    return { name: '', username: '', password: '', url: '' };
  },
  methods: {
    save: function() {
      const item = new Item();
      item.content = this.passwordName;
      this.standardfileClient.sync(item);
    }
  },
  dependencies: ['standardfileClient', 'hello']
};
</script>

<style>
#app {
}
</style>
