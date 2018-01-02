<template>
  <div>
    <ul>
      <li v-for="password in passwords" :key="password.uuid" 
          v-on:click="selectPasswordItem(password.uuid)"
          class="c-hand">
        {{password.name}}
      </li>
    </ul>
    <div v-if="selectedPasswordItem" class="modal" v-bind:class="{ active: selectedPasswordItem }" id="modal-id">
      <a v-on:click="clearSelectedPasswordItem" class="modal-overlay" aria-label="Close"></a>
      <div class="modal-container">
        <div class="modal-header">
          <a v-on:click="clearSelectedPasswordItem" class="btn btn-clear float-right" aria-label="Close"></a>
          <div class="modal-title h5">{{selectedPasswordItem.name}}</div>
        </div>
        <div class="modal-body">
          <dl>
            <dt v-if="selectedPasswordItem.username">Username</dt>
            <dd v-if="selectedPasswordItem.username">
              {{selectedPasswordItem.username}}
            </dd>
            <dt>Password</dt>
            <dd>
              <PasswordDisplay :password="selectedPasswordItem.password" />
            </dd>
            <dt v-if="selectedPasswordItem.url">Site</dt>
            <dd v-if="selectedPasswordItem.url">
              <a :href="selectedPasswordItem.url">{{selectedPasswordItem.url}}</a>
            </dd>
          </dl>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn circle tooltip"
            data-tooltip="Delete"
            v-on:click="deletePasswordItem(selectedPasswordItem.uuid)">
            <i class="icon icon-delete"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import PasswordDisplay from './PasswordDisplay';

export default {
  name: 'PasswordList',
  components: { PasswordDisplay },
  dependencies: ['standardfileClient'],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      passwords: 'passwords'
    }),
    ...mapGetters({ selectedPasswordItem: 'getSelectedPasswordItem' })
  },
  methods: {
    ...mapActions(['selectPasswordItem', 'clearSelectedPasswordItem']),
    deletePasswordItem(uuid) {
      const toDelete = this.$store.getters.getPasswordItemByUuid(uuid);
      const serialized = toDelete.toStandardItem();
      serialized.deleted = true;
      this.standardfileClient.sync(serialized);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
