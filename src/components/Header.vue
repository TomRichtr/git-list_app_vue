<template>
  <div>
    <div class="header-wrapper hidden-s">
      <div @click="goToRepositories" class="option-wrapper">
        Repositories
      </div>
      <div @click="goToCommits" class="option-wrapper">
        Commits
      </div>
      <div @click="goToBranches" class="option-wrapper">
        Branches
      </div>
      <div @click="goToIssues" class="option-wrapper">
        Issues
      </div>

      <div @click="goToAbout" class="option-wrapper">
        About
      </div>
    </div>
    <div class="header-wrapper hidden-l">
      <font-awesome-icon class="link-marker" :icon="['fa', 'bars']" size="2x" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    goToRepositories() {
      this.$router.push({
        name: "RepsPage",
      });
    },
    goToBranches() {
      this.$router.push({
        name: "BranchesPage",
        params: { id: this.$store.getters.repIdGetter },
      });
    },
    goToCommits() {
      this.$router.push({
        name: "CommitsPage",
        params: { id: this.$store.getters.repIdGetter },
      });
    },
    goToIssues() {
      this.$router.push({
        name: "IssuesPage",
        params: { id: this.$store.getters.repIdGetter },
      });
    },
    goToAbout() {
      this.$router.push({
        name: "AboutPage",
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.hidden-s {
  @media (max-width: $breakpoint-s) {
    display: none !important;
  }
}
.hidden-l {
  @media (min-width: $breakpoint-s) {
    display: none !important;
  }
}
.header-wrapper {
  display: flex;
  justify-content: space-evenly;
}

.option-wrapper {
  width: 100%;
  text-align: center;
  font-family: "Roboto Condensed", sans-serif;
  transition: background 1s;
  padding: $xs-size;
  align-content: space-between;
  &:hover {
    cursor: pointer;
    background-color: $color4;
  }
}

.option {
  width: 100%;
  text-align: center;
  align-self: center;
  margin: 0px;
}

.marked {
  background: red;
}
</style>
