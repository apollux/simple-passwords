<template>
  <div>
    <div class="form-group">
      <h2>Login</h2>
      <label class="form-label">Email
        <input
          class="form-input"
          name="email"
          placeholder="Email"
          v-model="email"
          v-validate="'required|email'">
        <p v-show="errors.has('email')" class="form-input-hint">Valid email address required.</p>
      </label>
      <label class="form-label">Password
        <input
          type="password"
          class="form-input"
          placeholder="Password"
          v-model="password"
          v-validate="'required'">
      </label>
    </div>
    <div class="form-group">
      <LoadingButton
        class="btn-primary"
        :content="'Login'"
        :action="login"
        :disabled="errors.any()" />
    </div>
  </div>
</template>

<script>
import LoadingButton from './LoadingButton';

export default {
  name: 'Login',
  components: { LoadingButton },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        await this.standardfileClient.signIn(this.email, this.password);
      } catch (e) {
        this.password = '';
        if (e.response.status === 404 || e.response.status === 401)
          this.$notify.error(
            `Login failed. Incorrect username or password provided`
          );
        else {
          this.$notify.error('Something went wrong. Please try again in a bit');
        }
        return;
      }
      this.onLoggedIn();
    },
    onLoggedIn() {
      this.standardfileClient.sync();
      this.$emit('loggedIn');
    }
  },
  dependencies: ['standardfileClient']
};
</script>
