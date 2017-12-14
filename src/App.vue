<template>
  <div id="app" class="container">
    <div class="columns">
      <div class="column col-8 col-mx-auto"><h1>Simple Passwords</h1></div>
      <div class="column col-8 col-mx-auto">
        <div class="has-icon-right">
          <input type="text" class="form-input" placeholder="Search">
            <i class="form-icon icon icon-search"></i>
        </div>
        <div class="column col-6">
          <PasswordList />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PasswordList from './components/PasswordList';

export default {
  name: 'app',
  components: {
    PasswordList
  }
};
</script>

<style>
#app {
}
</style>
