<template>
  <div class="main-wrapper">
    <div
      :class="checkEven(i)"
      class="issue-wrapper"
      :id="issue.id"
      :key="issue.id"
      v-for="(issue, i) in issues"
    >
      <div class="row issue-wrapper-link">
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
import { mapGetters, mapActions } from "vuex";
import {
  convertStringTitle,
  convertDate,
  checkEven,
  convertDateRelative,
  convertStringDescription,
  convertString,
} from "../utilities";

export default {
  computed: {
    ...mapGetters({
      issues: "getIssues",
      repositoryName: "getRepositoryName",
    }),
  },
  methods: {
    ...mapActions({ fetchIssues: "fetchIssues" }),
    checkEven: checkEven,
    convertStringTitle: convertStringTitle,
    convertDate: convertDate,
    convertDateRelative: convertDateRelative,
    convertStringDescription: convertStringDescription,
    convertString: convertString,
  },
  created() {
    this.fetchIssues(this.repositoryName);
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
  color: $secondary;
}

.text-link {
  display: inline-block;
}
.issue-column-right {
  align-items: right;
  text-align: right;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.text-link.text-right {
  align-items: right;
  align-self: right;
}
.issue-column-left {
  align-items: left;
  text-align: left;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.issue-wrapper {
  width: 100%;
  padding: $xs-size;
  background: $primary;
  border-left-width: $xs-size;
  border-left-style: solid;
  border-left-color: $warning;
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
  color: $secondary;
  white-space: nowrap;
}
.text-left {
  text-align: left;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.text-center {
  text-align: center;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.text-right {
  text-align: right;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.title {
  font-size: $xs-size;
  margin: 0px;
  padding: 0px;
  color: $dark;
  font-weight: bold;
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
