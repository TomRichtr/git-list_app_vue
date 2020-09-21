<template>
  <div class="main-wrapper">
    <div
      :class="checkEvenIssue(i)"
      class="issue-wrapper"
      :id="commit.sha"
      :key="commit.sha"
      v-for="(commit, i) in commits"
    >
      <div class="issue-wrapper-link">
        <div class="row">
          <div class="col-sm issue-column-left">
            <p class="title title-left text-left">Commited By</p>
            <a
              :href="`mailto:' + commit.commit.author.email`"
              class="text text-link text-left"
            >
              {{ commit.commit.author.name }}
              <font-awesome-icon
                class="link-marker"
                :icon="['fa', 'mouse']"
                size="sm"
            /></a>
          </div>
          <div class="col-sm issue-column-middle">
            <p class="title title-right text text-center">Message</p>
            <p class="text text text-center" :title="commit.commit.message">
              {{ convertStringTitle(commit.commit.message) }}
            </p>
          </div>
          <div class="col-sm issue-column-right">
            <p class="title title-right text-right">User ID</p>
            <a
              class="text text-link text-right"
              :href="commit.committer.html_url"
              >{{ commit.committer.login }}
              <font-awesome-icon
                class="link-marker"
                :icon="['fa', 'mouse']"
                size="sm"
            /></a>
          </div>
        </div>
        <div class="row">
          <div class="col-sm issue-column-left">
            <p class="title title-left text-left">Commited at</p>
            <p class="text text-left">
              {{ convertDate(commit.commit.author.date) }}
            </p>
          </div>
          <div class="col-sm issue-column-middle">
            <p class="title title-middle text-center"></p>
            <p class="text text-center"></p>
          </div>
          <div class="col-sm issue-column-right">
            <p class="title title-right text-right">Comments Count</p>
            <p class="text text-right">{{ commit.commit.comment_count }}</p>
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
    this.$store.dispatch("fetchCommits", this.$store.getters.repNameGetter);
  },
  computed: {
    commits() {
      return this.$store.getters.commitsGetter;
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
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";
.main-wrapper {
  width: 100%;
  height: 100vh;
  margin-top: $l-size * 1.1;
  @media (max-width: $breakpoint-s) {
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
.text-link.text-right {
  align-items: right;
  align-self: right;
}
.issue-wrapper {
  width: 100%;
  padding: $xs-size;
  background: $primary;
  border-left-width: $xs-size;
  border-left-style: solid;
  border-left-color: $success;
}
.even-issue-wrapper {
  background-color: $primary;
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    text-decoration: none;
    background-color: $danger;
    border-left-width: $xl-size;
  }
}
.odd-issue-wrapper {
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
  color: $dark;
  font-weight: bold;
}
</style>
