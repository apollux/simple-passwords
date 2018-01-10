<template>
  <div id="app" class="container grid-lg">
    <div class="columns">
      <div class="column col-12"><h1>Simple Passwords</h1></div>
      <div class="column col-12" v-if="!isLoggedIn">
        <LoginOrRegister v-on:loggedIn="onLogin" />
      </div>
    </div>
    <div class="columns" v-if="isLoggedIn">
      <div class="column col-1">
        <header class="navbar">
          <section class="navbar-section">
            <button
              type="button"
              class="btn tooltip circle"
              data-tooltip="New password"
              v-on:click="openNewPasswordForm">
              <i class="icon icon-plus"></i>
            </button>
            <button
              type="button"
              class="btn tooltip circle ml-1"
              data-tooltip="Logout"
              v-on:click="logout">
              <i class="icon icon-shutdown"></i>
            </button>
          </section>
        </header>
      </div>
      <div class="column col-7 col-mx-auto">
        <div class="has-icon-right">
          <input type="text" class="form-input" placeholder="Search">
          <i class="form-icon icon icon-search"></i>
        </div>
      </div>
      <div class="column col-2">
        <SyncStatus />
      </div>
      <div class="column col-12">
        <div class="divider"></div>
          <PasswordList />
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
import LoginOrRegister from './components/LoginOrRegister';
import PasswordList from './components/PasswordList';
import PasswordForm from './components/PasswordForm';
import SyncStatus from './components/SyncStatus';

export default {
  name: 'app',
  components: {
    LoginOrRegister,
    PasswordList,
    PasswordForm,
    SyncStatus
  },
  data() {
    return {
      name: '',
      username: '',
      password: '',
      url: '',
      showNewPasswordForm: false,
      isLoggedIn: false
    };
  },
  methods: {
    openNewPasswordForm() {
      this.showNewPasswordForm = true;
    },
    closeNewPasswordForm() {
      this.showNewPasswordForm = false;
    },
    onLogin() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    }
  }
};
</script>

<style>
#app {
}
</style>
