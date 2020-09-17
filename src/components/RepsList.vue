<template>
  <div>
    <div class="rep-wrapper" :id="rep.id" :key="rep.id" v-for="rep in reps">
      <div>{{ rep }}</div>

      <button @click="goToRepDetail(rep.id)">BUUUUU</button>
      <button @click="getRate()">dsadasdasUUUU</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    reps() {
      return this.$store.getters.repsGetter;
    },
  },
  created() {
    this.$store.dispatch("fetchReps");
  },
  methods: {
    goToRepDetail(repId) {
      this.$store.dispatch("fetchCommits", repId);
      this.$store.dispatch("fetchBranches", repId);
    },
    getRate() {
      this.$store.dispatch("fetchRate");
    },
  },
};
</script>

<style scoped lang="scss">
.rep-wrapper {
  border: black 1px solid;
}
</style>
