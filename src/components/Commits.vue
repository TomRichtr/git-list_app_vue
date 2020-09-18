<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchCommits");
  },
  computed: {
    commits() {
      return this.$store.getters.commitsGetter;
    },
  },
};
</script>

<style scoped lang="scss"></style>
