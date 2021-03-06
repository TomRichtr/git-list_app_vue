<template>
  <nav class="main-wrapper hidden-medium">
    <div
      class="header-wrapper main-wrapper hidden-medium"
      @click="openNavBarOnClick"
      :class="{ collapsed: collapsed }"
    >
      <font-awesome-icon class="navbar-icon" :icon="['fa', 'bars']" size="2x" />
    </div>
    <transition name="slide">
      <div class="header-wrapper-uncollapsed " v-if="collapsed">
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
      </div>
    </transition>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return { collapsed: false, userName: this.getUserName };
  },
  computed: {
    ...mapGetters({
      repositoryId: "getRepositoryId",
      headerOption: "getHeaderOption",
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
      this.$router
        .push({
          name: "RepositoriesPage",
        })
        .catch(() => {});
      this.setHeaderOption("repositories");
    },
    openNavBarOnClick() {
      this.collapsed = !this.collapsed;
    },
    goToRepositories() {
      this.$router
        .push({
          name: "RepositoriesPage",
        })
        .catch(() => {});
      this.setHeaderOption("repositories");
      this.collapsed = false;
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
        this.collapsed = false;
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
        this.collapsed = false;
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
        this.collapsed = false;
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

.slide-enter-active {
  -moz-transition-duration: 1s;
  -webkit-transition-duration: 1s;
  -o-transition-duration: 1s;
  transition-duration: 1s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  -moz-transition-duration: 1s;
  -webkit-transition-duration: 1s;
  -o-transition-duration: 1s;
  transition-duration: 1s;
  -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 500px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  overflow: hidden;
  max-height: 0;
}

.collapsed {
  max-height: auto;
  background-color: darken($color: $primary, $amount: 15%);
}
.main-wrapper {
  background-color: darken($color: $primary, $amount: 15%);
}
.hidden-medium {
  @media (min-width: $sm) {
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
  &:hover {
    background: $danger;
  }
}
.option {
  width: 100vw;
  text-align: center;
  align-self: center;
  margin: 0px;
  background-color: darken($color: $primary, $amount: 15%);
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
.navbar-icon {
  margin-top: $xs-size;
  margin-bottom: $xs-size;
}
</style>
