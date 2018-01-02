<template>
  <div>
    <label class="form-label" for="new-password-password">Password</label>
    <div class="input-group">
      <input
        class="form-input"
        id="new-password-password"
        :type="show ? 'text' : 'password'"
        v-model="input"
        placeholder="Password"
        v-on:change="onChange">
      <button
        type="button"
        class="btn btn-sm circle tooltip"
        :data-tooltip="show ? 'Hide password' : 'Show password'"
        v-on:click="toggleView">
        <icon :name="show ? 'eye-slash' : 'eye'" class="icon"></icon>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: ['password', 'showPassword'],
  data() {
    return {
      input: this.password,
      show: this.showPassword
    };
  },
  methods: {
    toggleView() {
      this.show = !this.show;
    },
    onChange() {
      this.$emit('changed', this.input);
    }
  }
};
</script>