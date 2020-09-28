<template>
  <!-- headerSmall -->
  <div class="main-wrapper hidden-l">
    <div
      class="header-wrapper"
      @click="openNavBarOnClick"
      :class="{ collapsed: collapsed }"
    >
      <font-awesome-icon class="navbar-icon" :icon="['fa', 'bars']" size="2x" />
    </div>
    <transition name="slide">
      <div class="header-wrapper-uncollapsed " v-if="collapsed">
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
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return { collapsed: false };
  },
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
        this.collapsed = false;
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
        this.collapsed = false;
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
        this.collapsed = false;
      }
    },
    goToAbout() {
      this.$router
        .push({
          name: "AboutPage",
        })
        .catch(() => {});
      this.setHeaderOption("about");
      this.collapsed = false;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

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
.hidden-l {
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
