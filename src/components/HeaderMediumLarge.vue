<template>
  <nav class="main-wrapper hidden-small">
    <div class="option-wrapper">
      <input
        type="text"
        class="user-name-input"
        placeholder="Enter username"
        v-model="userName"
        v-on:keyup="fetchRepositoriesOnCommand"
      />
    </div>

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
          : '',
      ]"
    >
      Issues
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      userName: this.getUserName,
    };
  },
  computed: {
    ...mapGetters({
      repositoryId: "getRepositoryId",
      headerOption: "getHeaderOption",
      getUserName: "getUserName",
    }),
  },
  methods: {
    ...mapActions({
      fetchRepositoriesOnUsersChange: "fetchRepositoriesOnUsersChange",
    }),
    ...mapMutations({
      setHeaderOption: "setHeaderOption",
      setRepositories: "setRepositories",
    }),
    fetchRepositoriesOnCommand() {
      if (this.userName === "") {
        this.setRepositories(null);
      } else {
        this.fetchRepositoriesOnUsersChange(this.userName);
      }
      this.fetchRepositoriesOnUsersChange(this.userName);
      this.goToRepositories();
    },
    goToRepositories() {
      this.$router
        .push({
          name: "RepositoriesPage",
        })
        .catch(() => {});
      this.setHeaderOption("repositories");
    },
    goToBranches() {
      if (this.headerOption === "repositories") {
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
      if (this.headerOption === "repositories") {
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
      if (this.headerOption === "repositories") {
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
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

input {
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  text-align: center;
  &:focus {
    outline: none;
  }
}
.hidden-small {
  @media (max-width: $sm) {
    display: none !important;
  }
}
.main-wrapper {
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
