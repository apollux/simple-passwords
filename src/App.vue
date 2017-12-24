<template>
  <div id="app" class="container">
    <div class="columns">
      <div class="column col-8 col-mx-auto"><h1>Simple Passwords</h1></div>
      <div class="column col-8 col-mx-auto">
        <div class="has-icon-right">
          <input type="text" class="form-input" placeholder="Search">
          <i class="form-icon icon icon-search"></i>
        </div>
      </div>
      <div class="column col-8 col-mx-auto">
        <header class="navbar">
          <section class="navbar-section">
            <button class="btn" v-on:click="openNewPasswordForm"><i class="icon icon-plus"></i></button>
          </section>
        </header>
        <div class="column col-6">
          <PasswordList />
        </div>
      </div>
    </div>
    <div class="modal" v-bind:class="{ active: showNewPasswordForm }">
      <a v-on:click="closeNewPasswordForm" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a v-on:click="closeNewPasswordForm" class="btn btn-clear float-right" aria-label="Close"></a>
          <div class="modal-title h5">New password</div>
        </div>
        <div class="modal-body">
          <PasswordForm v-on:closeMe="closeNewPasswordForm"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordList from './components/PasswordList';
import PasswordForm from './components/PasswordForm';

export default {
  name: 'app',
  components: {
    PasswordList,
    PasswordForm
  },
  data() {
    return {
      name: '',
      username: '',
      password: '',
      url: '',
      showNewPasswordForm: false
    };
  },
  methods: {
    openNewPasswordForm() {
      this.showNewPasswordForm = true;
    },
    closeNewPasswordForm() {
      this.showNewPasswordForm = false;
    }
  }
};
</script>

<style>
#app {
}
</style>
