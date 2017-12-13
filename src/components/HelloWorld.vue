<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <PasswordList></PasswordList>
  </div>
</template>

<script>
import PasswordList from './PasswordList';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  components: {
    PasswordList
  },
};
</script>
