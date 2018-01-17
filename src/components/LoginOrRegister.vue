<template>
  <div>
    <div class="columns">
      <div class="column">
        <Register v-on:loggedIn="onLogin" />
      </div>
      <div class="divider-vert" data-content="OR"></div>
      <div class="column">
        <Login v-on:loggedIn="onLogin" />
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login';
import Register from './Register';

export default {
  name: 'LoginOrRegister',
  components: { Login, Register },
  methods: {
    onLogin() {
      this.$emit('loggedIn');
    }
  }
};
</script>
