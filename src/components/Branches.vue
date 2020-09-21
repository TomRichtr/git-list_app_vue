<template>
  <div>
    <div
      :class="checkEvenBranch(i)"
      class="branch-wrapper"
      :id="branch.commit.sha"
      :key="branch.commit.sha"
      v-for="(branch, i) in branches"
    >
      <div class="branch-wrapper-link">
        <div class="row">
          <div class="col-sm branch-column-left">
            <p class="title title-left text text-left">
              Name
            </p>
            <p class="text text-left">{{ convertStringTitle(branch.name) }}</p>
          </div>
          <div class="col-sm branch-column-right">
            <p class="title title-right text-right">Protection Status</p>
            <p class="text text-right">
              {{ convertProctectionStatus(branch.protected) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from "moment";

export default {
  created() {
    this.$store.dispatch("fetchBranches", this.$store.getters.repNameGetter);
  },
  computed: {
    branches() {
      return this.$store.getters.branchesGetter;
    },
  },
  methods: {
    checkEvenBranch(i) {
      return i % 2 === 0 ? "even-branch-wrapper" : "odd-branch-wrapper";
    },
    convertStringTitle(string) {
      const stringAdjusted =
        string === null ? "" : string.charAt(0).toUpperCase() + string.slice(1);
      return stringAdjusted.length > 25
        ? stringAdjusted.slice(0, 25) + "..."
        : stringAdjusted;
    },
    convertProctectionStatus(protection) {
      return !protection ? "Not protected" : "Protected";
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.link-marker {
  margin-left: $xs-size/5;
  color: $color4;
}
.text-link {
  display: inline-block;
}
.branch-column-right {
  align-items: right;
  text-align: right;
}
.text-link.text-right {
  align-items: right;
  align-self: right;
  @media (max-width: $breakpoint-s) {
    text-align: center !important;
  }
}
.issue-column-left {
  align-items: left;
  text-align: left;
  @media (max-width: $breakpoint-s) {
    text-align: center !important;
  }
}
.branch-wrapper {
  width: 100%;
  padding: $xs-size;
  background: $color1;
  border-left-width: $xs-size;
  border-left-style: solid;
  border-left-color: $color5;
}
.even-branch-wrapper {
  background-color: $color1;
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    text-decoration: none;
    background-color: $color3;
    border-left-width: $xl-size;
    cursor: pointer;
  }
}
.odd-branch-wrapper {
  background-color: $color2;
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    text-decoration: none;
    background-color: $color3;
    border-left-width: $xl-size;
    cursor: pointer;
  }
}
.text {
  margin: 0px;
  padding: 0px;
  color: $color4;
  font-family: "Roboto Condensed", sans-serif;
}
.text-left {
  text-align: left;
  @media (max-width: $breakpoint-s) {
    text-align: center !important;
  }
}
.text-center {
  text-align: center;
  @media (max-width: $breakpoint-s) {
    text-align: center !important;
  }
}
.text-right {
  text-align: right;
  @media (max-width: $breakpoint-s) {
    text-align: center !important;
  }
}
.title {
  font-size: $xs-size;
  margin: 0px;
  padding: 0px;
  color: $color5;
  font-weight: bold;
  font-family: "Roboto Condensed", sans-serif;
}
</style>
