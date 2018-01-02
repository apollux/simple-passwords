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
      <button
        type="button"
        class="btn btn-sm circle tooltip"
        :data-tooltip="showPassword ? 'Hide password' : 'Show password'"
        v-on:click="toggleView">
        <icon :name="showPassword ? 'eye-slash' : 'eye'" class="icon"></icon>
      </button>
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