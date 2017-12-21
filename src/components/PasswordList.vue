<template>
  <div class="password-container">
    <div class="accordion" v-for="(password, index) in passwords" :key="password.uuid">
      <input type="checkbox" :id="'password-arcordion-' + index" name="accordion-checkbox" hidden>
      <label class="accordion-header c-hand" :for="'password-arcordion-' + index">
        <i class="icon icon-arrow-right mr-1"></i>
        {{password.name}}
      </label>
      <div class="accordion-body">
        <ul>
          <li v-if="password.username">
            {{password.username}}
          </li>
          <li>
            {{'*'.repeat(password.password.length)}}
          </li>
          <li v-if="password.url">
            <a :href="password.url">{{password.url}}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'PasswordList',
  data() {
    return {};
  },
  computed: mapState({
    count: 'count',
    passwords: 'passwords'
  }),
  methods: {
    ...mapActions(['increment'])
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
