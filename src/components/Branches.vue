<template>
  <div class="main-wrapper">
    <div
      :class="checkEven(i)"
      class="branch-wrapper"
      :id="branch.commit.sha"
      :key="branch.commit.sha"
      v-for="(branch, i) in branches"
    >
      <div class="branch-wrapper-link">
        <div class="row">
          <div class="col-sm branch-column-left">
            <p class="title">
              Name
            </p>
            <p class="text">{{ convertStringTitle(branch.name) }}</p>
          </div>
          <div class="col-sm branch-column-right">
            <p class="title">Protection Status</p>
            <p class="text">
              {{ convertProctectionStatus(branch.protected) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  convertStringTitle,
  convertProctectionStatus,
  checkEven,
} from "../utilities";

export default {
  computed: {
    ...mapGetters({
      branches: "getBranches",
      repositoryName: "getRepositoryName",
    }),
  },
  methods: {
    ...mapActions({ fetchBranches: "fetchBranches" }),
    convertProctectionStatus: convertProctectionStatus,
    convertStringTitle: convertStringTitle,
    checkEven: checkEven,
  },
  created() {
    this.fetchBranches(this.repositoryName);
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.main-wrapper {
  width: 100%;
  height: 100vh;
  margin-top: $l-size * 1.1;
  @media (max-width: $sm) {
    margin-top: $l-size * 1.3;
  }
}
.link-marker {
  margin-left: $xs-size/5;
  color: $dark;
}
.text-link {
  display: inline-block;
}
.branch-column-right {
  align-items: right;
  text-align: right;
}

.issue-column-left {
  align-items: left;
  text-align: left;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.branch-wrapper {
  width: 100%;
  padding: $xs-size;
  background: $primary;
  border-left-width: $xs-size;
  border-left-style: solid;
  border-left-color: $info;
}
.even-wrapper {
  background-color: $primary;
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    text-decoration: none;
    background-color: $danger;
    border-left-width: $xl-size;
  }
}
.odd-wrapper {
  background-color: darken($color: $primary, $amount: 15%);
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    text-decoration: none;
    background-color: $danger;
    border-left-width: $xl-size;
  }
}
.text {
  margin: 0px;
  padding: 0px;
  color: $dark;
  text-align: center;
  white-space: nowrap;
}

.title {
  font-size: $xs-size;
  text-align: center;
  margin: 0px;
  padding: 0px;
  color: $dark;
  font-weight: bold;
}
</style>
