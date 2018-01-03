<template>
  <button
    type="button"
    class="btn"
    v-bind:class="{ loading: loading}"
    v-on:click="clickHandler">{{content}}</button>
</template>

<script>
export default {
  name: 'LoadingButton',
  props: ['content', 'action'],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    async clickHandler() {
      this.loading = true;
      try {
        await this.action();
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>