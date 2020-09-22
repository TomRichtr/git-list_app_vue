<template>
  <div class="main-wrapper sticky-top hidden-s">
    <div class="header-wrapper">
      <div
        @click="goToRepositories"
        class="option-wrapper reps"
        :class="[settedOption === 'reps' ? 'marked' : '']"
      >
        Repositories
      </div>
      <div
        @click="goToCommits"
        class="option-wrapper commits"
        :class="[
          settedOption === 'commits'
            ? 'marked'
            : settedOption === 'reps'
            ? 'disabled'
            : settedOption === 'about'
            ? 'disabled'
            : '',
        ]"
      >
        Commits
      </div>
      <div
        @click="goToBranches"
        class="option-wrapper branches"
        :class="[
          settedOption === 'branches'
            ? 'marked'
            : settedOption === 'reps'
            ? 'disabled'
            : settedOption === 'about'
            ? 'disabled'
            : '',
        ]"
      >
        Branches
      </div>
      <div
        @click="goToIssues"
        class="option-wrapper issues"
        :class="[
          settedOption === 'issues'
            ? 'marked'
            : settedOption === 'reps'
            ? 'disabled'
            : settedOption === 'about'
            ? 'disabled'
            : '',
        ]"
      >
        Issues
      </div>

      <div
        @click="goToAbout"
        class="option-wrapper about"
        :class="[settedOption === 'about' ? 'marked' : '']"
      >
        About
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    settedOption() {
      return this.$store.getters.headerOptionGetter;
    },
  },
  methods: {
    goToRepositories() {
      this.$router
        .push({
          name: "RepsPage",
        })
        .catch(() => {});
      this.$store.dispatch("setHeaderOption", "reps");
    },
    goToBranches() {
      if (this.settedOption === "reps" || this.settedOption === "about") {
        return;
      } else {
        this.$router
          .push({
            name: "BranchesPage",
            params: { id: this.$store.getters.repIdGetter },
          })
          .catch(() => {});
        this.$store.dispatch("setHeaderOption", "branches");
      }
    },
    goToCommits() {
      if (this.settedOption === "reps" || this.settedOption === "about") {
        return;
      } else {
        this.$router
          .push({
            name: "CommitsPage",
            params: { id: this.$store.getters.repIdGetter },
          })
          .catch(() => {});
        this.$store.dispatch("setHeaderOption", "commits");
      }
    },
    goToIssues() {
      if (this.settedOption === "reps" || this.settedOption === "about") {
        return;
      } else {
        this.$router
          .push({
            name: "IssuesPage",
            params: { id: this.$store.getters.repIdGetter },
          })
          .catch(() => {});
        this.$store.dispatch("setHeaderOption", "issues");
      }
    },
    goToAbout() {
      this.$router
        .push({
          name: "AboutPage",
        })
        .catch(() => {});
      this.$store.dispatch("setHeaderOption", "about");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.hidden-s {
  @media (max-width: $sm) {
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
  padding: $xs-size;
  align-content: space-between;
  background-color: darken($color: $primary, $amount: 15%);
  &:hover {
    background: $danger;
  }
}

.option {
  width: 100%;
  text-align: center;
  align-self: center;
  margin: 0px;
}
.marked {
  background: $danger;
}
.disabled {
  color: lighten($color: $light, $amount: 5%) !important;
  &:hover {
    cursor: not-allowed;
    background-color: darken($color: $primary, $amount: 15%);
  }
}
</style>
