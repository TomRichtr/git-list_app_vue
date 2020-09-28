<template>
  <div class="main-wrapper">
    <div
      :class="checkEven(i)"
      class="item-wrapper row"
      :id="branch.commit.sha"
      :key="branch.commit.sha"
      v-for="(branch, i) in branches"
    >
      <div class="col-sm">
        <p class="title">
          Name
        </p>
        <p class="text">{{ convertStringTitle(branch.name) }}</p>
      </div>
      <div class="col-sm">
        <p class="title">Protection Status</p>
        <p class="text">
          {{ convertProctectionStatus(branch.protected) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  checkEven,
  convertProctectionStatus,
  convertStringTitle,
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
    checkEven: checkEven,
    convertProctectionStatus: convertProctectionStatus,
    convertStringTitle: convertStringTitle,
  },
  created() {
    this.fetchBranches(this.repositoryName);
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.main-wrapper {
  margin-top: $l-size * 1.1;
  @media (max-width: $sm) {
    margin-top: $l-size * 1.3;
  }
}
.item-wrapper {
  border-left: solid $info $m-size;
  padding: $xs-size;
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    background-color: $danger;
    border-left-width: $xl-size;
  }
}
.even-wrapper {
  background-color: $primary;
}
.odd-wrapper {
  background-color: darken($color: $primary, $amount: 15%);
}
.text {
  color: $dark;
  margin: 0;
  padding: 0;
  text-align: center;
  white-space: nowrap;
}
.title {
  color: $dark;
  font-size: $xs-size;
  font-weight: bold;
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>
