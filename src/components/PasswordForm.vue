<template>
    <form>
    <div class="form-group">
        <label class="form-label" for="new-password-name">Name</label>
        <input 
          class="form-input"
          id="new-password-name"
          type="text"
          v-model="name"
          placeholder="Name" 
          v-on:keyup.enter="submit">

        <label class="form-label" for="new-password-username">Username or e-mail</label>
        <input class="form-input"
          id="new-password-username"
          type="text" 
          v-model="username"
          placeholder="Username" 
          v-on:keyup.enter="submit">
        
        <PasswordInput :password="password" :showPassword="showPassword" />

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
        <span class="btn input-group-btn" v-on:click="cancel">Cancel</span>
    </div>
    </form>
</template>

<script>
import generatePassword from '../domain/generate-password';
import PasswordItem from '../domain/PasswordItem';
import PasswordInput from './PasswordInput';

export default {
  name: 'PasswordForm',
  components: { PasswordInput },
  data() {
    return {
      name: '',
      username: '',
      password: generatePassword(),
      url: '',
      showPassword: false
    };
  },
  methods: {
    cancel() {
      this.done();
    },
    save() {
      try {
        const passwordItem = new PasswordItem({
          name: this.name,
          username: this.username,
          password: this.password,
          url: this.url
        });

        const itemToSync = passwordItem.toStandardItem();

        this.standardfileClient.sync(itemToSync);
        this.done();
      } catch (e) {
        console.error(e);
      }
    },
    done() {
      this.name = '';
      this.username = '';
      this.password = generatePassword();
      this.url = '';
      this.showPassword = false;
      this.$emit('closeMe');
    }
  },
  dependencies: ['standardfileClient']
};
</script>
