<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("fetchReps");
  },
  computed: {
    issues() {
      return this.$store.getters.issuesGetter;
    },
  },
};
</script>

<style scoped lang="scss"></style>
