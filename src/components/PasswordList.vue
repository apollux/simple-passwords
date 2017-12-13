<template>
  <div class="hello">
    <h1>Passwords {{test}}</h1>
    <strong>{{ count }}</strong>
    <button v-on:click="increment">click me</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PasswordList',
  data() {
    return {
      test: 'pwdlist',
    };
  },
  computed: mapState({
    count: 'count'
    }),
  methods: {
    ...mapActions(['increment'])
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    color: red
}
</style>
