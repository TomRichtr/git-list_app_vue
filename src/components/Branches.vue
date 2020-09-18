<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchBranches");
  },
  computed: {
    commits() {
      return this.$store.getters.branchesGetter;
    },
  },
};
</script>

<style scoped lang="scss"></style>
