<template>
  <div>
    <p class="no-commits" v-if="commitsLength != false && error === ''">
      {{ commitsLength }}
    </p>
    <p class="no-commits" v-if="error">
      {{ error }}
    </p>
    <div class="main-wrapper" v-if="!error">
      <div
        :class="checkEven(i)"
        class="item-wrapper row"
        :id="commit.sha"
        :key="commit.sha"
        v-for="(commit, i) in commits"
      >
        <div class="col-sm-6 col-md-6 col-lg-6 commited-by">
          <p class="title">Commited By</p>
          <a
            :href="`mailto: ${commit.commit.author.email}`"
            class="text"
            target="_blank"
          >
            {{ commit.commit.author.name }}
            <font-awesome-icon
              class="link-marker"
              :icon="['fa', 'mouse']"
              size="sm"
            />
          </a>
        </div>

        <div class="col-sm-6 col-md-6 col-lg-6 message">
          <p class="title">Message</p>
          <p class="text" :title="commit.commit.message">
            {{ convertStringTitle(commit.commit.message) }}
          </p>
        </div>

        <div class="col-sm-6 col-md-6 col-lg-6 commited-at">
          <p class="title">Commited at</p>
          <p class="text">
            {{ convertDate(commit.commit.author.date) }}
          </p>
        </div>
        <div class="col-sm-6 col-md-6 col-lg-6 comments-count">
          <p class="title">Comments Count</p>
          <p class="text">{{ commit.commit.comment_count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { convertStringTitle, convertDate, checkEven } from "../utilities";

export default {
  computed: {
    ...mapGetters({
      commits: "getCommits",
      repositoryName: "getRepositoryName",
      error: "getErrorMessage",
    }),
    commitsLength() {
      return this.commits.length === 0 ? "No commits to show" : false;
    },
  },
  methods: {
    ...mapActions({ fetchCommits: "fetchCommits" }),
    checkEven: checkEven,
    convertDate: convertDate,
    convertStringTitle: convertStringTitle,
  },
  created() {
    this.fetchCommits(this.repositoryName);
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.no-commits {
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
  border-left: solid $success $m-size;
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
.commited-by {
  text-align: left;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.commited-at {
  text-align: left;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.comments-count {
  text-align: right;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.message {
  text-align: right;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.title {
  color: $dark;
  font-size: $xs-size;
  font-weight: bold;
  margin: 0px;
  padding: 0px;
}
</style>
