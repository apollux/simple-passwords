<template>
  <div>
    <label class="form-label" for="new-password-password">Password</label>
    <div class="input-group">
        <input
            class="form-input"
            id="new-password-password"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            v-on:keyup.enter="submit">
        <i v-on:click="toggleView" class="c-hand"><icon :name="showPassword ? 'eye-slash' : 'eye'"></icon></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: ['password', 'showPassword'],
  methods: {
    toggleView() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>