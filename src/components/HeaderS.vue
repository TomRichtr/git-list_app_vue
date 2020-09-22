<template>
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
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return { collapsed: false };
  },
  created() {},
  computed: {
    settedOption() {
      return this.$store.getters.headerOptionGetter;
    },
  },
  methods: {
    openNavBarOnClick() {
      this.collapsed = !this.collapsed;
    },
    goToRepositories() {
      this.$router
        .push({
          name: "RepsPage",
        })
        .catch(() => {});
      this.$store.dispatch("setHeaderOption", "reps");
      this.collapsed = false;
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
        this.collapsed = false;
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
        this.collapsed = false;
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
        this.collapsed = false;
      }
    },
    goToAbout() {
      this.$router
        .push({
          name: "AboutPage",
        })
        .catch(() => {});
      this.$store.dispatch("setHeaderOption", "about");
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
  @media (min-width: $breakpoint-s + 1) {
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
    cursor: pointer;
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
