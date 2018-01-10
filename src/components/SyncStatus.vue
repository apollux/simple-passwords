<template>
  <div>
    <span class="text-capitalize text-gray">
      <i class="icon" v-bind:class="{ loading: syncStatus === 'syncing', 'icon-check': syncStatus === 'synced'}"></i>
      {{ syncStatus }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SyncStatus',
  computed: {
    ...mapState(['syncStatus'])
  }
};
</script>

<style scoped>
span {
  font-size: 0.8em;
}
</style>