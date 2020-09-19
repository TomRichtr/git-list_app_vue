<template>
  <div>
    <div
      :class="checkEvenIssue(i)"
      class="issue-wrapper"
      :id="issue.id"
      :key="issue.id"
      v-for="(issue, i) in issues"
    >
      <div class="issue-wrapper-link">
        <div class="row">
          <div class="col-sm issue-column-left">
            <p class="title title-left text-left">Title</p>
            <a
              class="text text-link text-left"
              :title="issue.title"
              :href="issue.html_url"
              >{{ convertStringTitle(issue.title) }}

              <font-awesome-icon
                class="link-marker"
                :icon="['fa', 'mouse']"
                size="sm"
            /></a>
          </div>
          <div class="col-sm issue-column-middle">
            <p class="title title-right text text-center">Body</p>
            <p class="text text text-center" :title="issue.body">
              {{ convertStringDescription(issue.body) }}
            </p>
          </div>
          <div class="col-sm issue-column-right">
            <p class="title title-right text-right">Filled by</p>
            <a class="text text-link text-right" :href="issue.user.html_url"
              >{{ issue.user.login }}
              <font-awesome-icon
                class="link-marker"
                :icon="['fa', 'mouse']"
                size="sm"
            /></a>
          </div>
        </div>
        <div class="row">
          <div class="col-sm issue-column-left">
            <p class="title title-left text-left">Created At</p>
            <p class="text text-left">{{ convertDate(issue.created_at) }}</p>
          </div>
          <div class="col-sm issue-column-middle">
            <p class="title title-middle text-center">Last Update</p>
            <p class="text text-center">
              {{ convertDateRelative(issue.updated_at) }}
            </p>
          </div>
          <div class="col-sm issue-column-right">
            <p class="title title-right text-right">State</p>
            <p class="text text-right">{{ convertString(issue.state) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  created() {
    this.$store.dispatch("fetchIssues", this.$store.getters.repNameGetter);
  },
  computed: {
    issues() {
      return this.$store.getters.issuesGetter;
    },
  },
  methods: {
    checkEvenIssue(i) {
      return i % 2 === 0 ? "even-issue-wrapper" : "odd-issue-wrapper";
    },
    convertStringTitle(string) {
      const stringAdjusted =
        string === null ? "" : string.charAt(0).toUpperCase() + string.slice(1);
      return stringAdjusted.length > 25
        ? stringAdjusted.slice(0, 25) + "..."
        : stringAdjusted;
    },
    convertDate(date) {
      return moment(date).format("Do MMM YYYY, h:mm");
    },
    convertDateRelative(date) {
      return moment(date).fromNow();
    },
    convertStringDescription(string) {
      const adjustedString =
        string === null
          ? ""
          : string.charAt(0).toUpperCase() +
            string.slice(1) +
            (string.slice(-1) === "." ? "" : ".");
      return adjustedString.length > 40
        ? adjustedString.slice(0, 40) + "..."
        : adjustedString;
    },
    convertString(string) {
      return string === null
        ? ""
        : string.charAt(0).toUpperCase() + string.slice(1);
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
.issue-column-right {
  align-items: right;
  text-align: right;
}
.text-link.text-right {
  align-items: right;
  align-self: right;
}
.issue-wrapper {
  width: 100%;
  padding: $xs-size;
  background: $color1;
  border-left-width: $xs-size;
  border-left-style: solid;
  border-left-color: $color5;
}
.even-issue-wrapper {
  background-color: $color1;
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    text-decoration: none;
    background-color: $color3;
    border-left-width: $xl-size;
    cursor: pointer;
  }
}
.odd-issue-wrapper {
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
}
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
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
