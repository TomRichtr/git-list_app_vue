<template>
  <div>
    <p class="no-issues" v-if="issuesLength != false && error === ''">
      {{ issuesLength }}
    </p>
    <p class="no-issues" v-if="error">
      {{ error }}
    </p>
    <div class="main-wrapper" v-if="!error">
      <div
        :class="checkEven(i)"
        class="item-wrapper row"
        :id="issue.id"
        :key="issue.id"
        v-for="(issue, i) in issues"
      >
        <div class="col-sm-6 col-md-4 col-lg-4 title-issue">
          <p class="title">Title</p>
          <a
            class="text"
            :title="issue.title"
            :href="issue.html_url"
            target="_blank"
            >{{ convertStringTitle(issue.title) }}
            <font-awesome-icon
              class="link-marker"
              :icon="['fa', 'mouse']"
              size="sm"
          /></a>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 body">
          <p class="title">Body</p>
          <p class="text" :title="issue.body">
            {{ convertStringDescription(issue.body) }}
          </p>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 filled-by">
          <p class="title">Filled by</p>
          <a class="text" :href="issue.user.html_url" target="_blank"
            >{{ issue.user.login }}
            <font-awesome-icon
              class="link-marker"
              :icon="['fa', 'mouse']"
              size="sm"
          /></a>
        </div>

        <div class="col-sm-6 col-md-4 col-lg-4 created-at">
          <p class="title">Created At</p>
          <p class="text">{{ convertDate(issue.created_at) }}</p>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 last-update">
          <p class="title">Last Update</p>
          <p class="text">
            {{ convertDateRelative(issue.updated_at) }}
          </p>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 state">
          <p class="title">State</p>
          <p class="text">{{ convertString(issue.state) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  checkEven,
  convertDate,
  convertDateRelative,
  convertString,
  convertStringDescription,
  convertStringTitle,
} from "../utilities";

export default {
  computed: {
    ...mapGetters({
      issues: "getIssues",
      repositoryName: "getRepositoryName",
      error: "getErrorMessage",
    }),
    issuesLength() {
      return this.issues.length === 0 ? "No issues to show" : false;
    },
  },
  methods: {
    ...mapActions({ fetchIssues: "fetchIssues" }),
    checkEven: checkEven,
    convertDate: convertDate,
    convertDateRelative: convertDateRelative,
    convertString: convertString,
    convertStringDescription: convertStringDescription,
    convertStringTitle: convertStringTitle,
  },
  created() {
    this.fetchIssues(this.repositoryName);
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.no-issues {
  margin-top: $xl-size * 1.3;
  display: block;
  text-align: center;
}
.main-wrapper {
  margin-top: $l-size * 1.1;
  @media (max-width: $sm) {
    margin-top: $l-size * 1.3;
  }
}
.link-marker {
  color: $secondary;
  margin-left: $xs-size/5;
}
.item-wrapper {
  background: $primary;
  border-left: solid $warning $m-size;
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
  color: $secondary;
  margin: 0px;
  padding: 0px;
  white-space: nowrap;
}
.title {
  color: $dark;
  font-size: $xs-size;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}
.title-issue {
  text-align: left;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.created-at {
  text-align: left;
  @media (max-width: $md) {
    text-align: right !important;
  }
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.body {
  text-align: center;
  @media (max-width: $md) {
    text-align: right !important;
  }
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.last-update {
  text-align: center;
  @media (max-width: $md) {
    text-align: left !important;
  }
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.filled-by {
  text-align: right;
  @media (max-width: $md) {
    text-align: left !important;
  }
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.state {
  text-align: right;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
</style>
