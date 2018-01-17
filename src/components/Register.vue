<template>
  <div>
    <div class="form-group">
      <h2>Register</h2>
        <label class="form-label">Email
          <input
            class="form-input"
            type="email"
            name="mail"
            placeholder="Email"
            v-model="email"
            v-validate="'required|email'">
          <p v-show="errors.has('mail')" class="form-input-hint">Valid email address required.</p>
        </label>
        <label class="form-label">Password
        <span class="text-gray">
          <p>This password protects all your other passwords, so make sure it is strong! Some suggestions:</p>
          <ul>
            <li v-for="suggestion in suggestions">{{ suggestion }}</li>
          </ul>
        </span>
        <input
          type="password"
          class="form-input"
          placeholder="Password"
          name="password"
          v-model="password"
          v-validate="'required|min:12'">
        <p v-show="errors.has('password')" class="form-input-hint">A strong password should have at least 12 characters.</p>
      </label>
      <label class="form-label">Repeat password
        <input
          type="password"
          class="form-input"
          name="password-confirm"
          placeholder="Repeat password"
          v-model="passwordConfirm"
          v-validate="'required|confirmed:password'">
        <p v-show="errors.has('password-confirm')" class="form-input-hint">Passwords do not match.</p>
      </label>
    </div>
    <div class="form-group">
        <LoadingButton
        class="btn-primary"
        :content="'Register'"
        :action="register"
        :disabled="errors.any()" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash/fp';
import generatePassword from '../domain/generate-password';
import LoadingButton from './LoadingButton';

export default {
  name: 'Register',
  components: { LoadingButton },
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      suggestions: _.map(generatePassword)(_.range(0, 3))
    };
  },
  methods: {
    async register() {
      try {
        await this.standardfileClient.register(this.email, this.password);
      } catch (e) {
        if (e.response.status === 401) {
          this.$notify.error('Username is already registered.');
        } else {
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
