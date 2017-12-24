<template>
    <span>
        <span v-if="showPassword">{{password}} <i v-on:click="toggleView" class="c-hand"><icon name="eye-slash"></icon></i></span>
        <span v-else>{{'*'.repeat(password.length)}} <i v-on:click="toggleView" class="c-hand"><icon name="eye"></icon></i></span>
        <i v-on:click="toClipboard" class="c-hand"><icon name="clipboard"></icon></i>
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
      window.setTimeout(() => {
        try {
          copy('cleared');
        } catch (e) {
          console.log(e);
        }
      }, 5000);
    }
  }
};
</script>