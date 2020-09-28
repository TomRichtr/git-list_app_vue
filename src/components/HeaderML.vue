<template>
  <div class="main-wrapper sticky-top hidden-s">
    <div class="header-wrapper">
      <div
        @click="goToRepositories"
        class="option-wrapper repositories"
        :class="[headerOption === 'repositories' ? 'marked' : '']"
      >
        Repositories
      </div>
      <div
        @click="goToCommits"
        class="option-wrapper commits"
        :class="[
          headerOption === 'commits'
            ? 'marked'
            : headerOption === 'repositories'
            ? 'disabled'
            : headerOption === 'about'
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
          headerOption === 'branches'
            ? 'marked'
            : headerOption === 'repositories'
            ? 'disabled'
            : headerOption === 'about'
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
          headerOption === 'issues'
            ? 'marked'
            : headerOption === 'repositories'
            ? 'disabled'
            : headerOption === 'about'
            ? 'disabled'
            : '',
        ]"
      >
        Issues
      </div>

      <div
        @click="goToAbout"
        class="option-wrapper about"
        :class="[headerOption === 'about' ? 'marked' : '']"
      >
        About
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters({
      repositoryId: "getRepositoryId",
      headerOption: "getHeaderOption",
    }),
  },
  methods: {
    ...mapMutations({
      setHeaderOption: "setHeaderOption",
    }),
    goToRepositories() {
      this.$router
        .push({
          name: "RepositoriesPage",
        })
        .catch(() => {});
      this.setHeaderOption("repositories");
    },
    goToBranches() {
      if (
        this.headerOption === "repositories" ||
        this.headerOption === "about"
      ) {
        return;
      } else {
        this.$router
          .push({
            name: "BranchesPage",
            params: { repositoryId: this.repositoryId },
          })
          .catch(() => {});
        this.setHeaderOption("branches");
      }
    },
    goToCommits() {
      if (
        this.headerOption === "repositories" ||
        this.headerOption === "about"
      ) {
        return;
      } else {
        this.$router
          .push({
            name: "CommitsPage",
            params: { repositoryId: this.repositoryId },
          })
          .catch(() => {});
        this.setHeaderOption("commits");
      }
    },
    goToIssues() {
      if (
        this.headerOption === "repositories" ||
        this.headerOption === "about"
      ) {
        return;
      } else {
        this.$router
          .push({
            name: "IssuesPage",
            params: { repositoryId: this.repositoryId },
          })
          .catch(() => {});
        this.setHeaderOption("issues");
      }
    },
    goToAbout() {
      this.$router
        .push({
          name: "AboutPage",
        })
        .catch(() => {});
      this.setHeaderOption("about");
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
