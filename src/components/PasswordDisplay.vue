<template>
  <span>
    <span v-if="showPassword">{{password}}
      <button
        type="button"
        v-on:click="toggleView"
        class="btn circle tooltip"
        data-tooltip="Hide password">
        <icon class="icon" name="eye-slash"></icon>
      </button>
    </span>
    <span v-else>{{'*'.repeat(password.length)}}
      <button
        type="button"
        class="btn circle tooltip"
        v-on:click="toggleView"
        data-tooltip="Show password">
        <icon class="icon" name="eye"></icon>
      </button>
    </span>
    <button
      type="button"
      v-on:click="toClipboard"
      class="btn circle tooltip"
      data-tooltip="Copy to clipboard">
      <icon class="icon" name="clipboard"></icon>
    </button>
  </span>
</template>

<script>
import copy from 'clipboard-copy';
export default {
  name: 'PasswordDisplay',
  props: ['password'],
  data() {
    return {
      showPassword: false
    };
  },
  methods: {
    toggleView() {
      this.showPassword = !this.showPassword;
    },
    toClipboard() {
      copy(this.password);
    }
  }
};
</script>