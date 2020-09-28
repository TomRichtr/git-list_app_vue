<template>
  <div class="main-wrapper">
    <div
      :class="checkEven(i)"
      class="issue-wrapper"
      :id="commit.sha"
      :key="commit.sha"
      v-for="(commit, i) in commits"
    >
      <div class="row issue-wrapper-link">
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
import { mapGetters, mapActions } from "vuex";
import { convertStringTitle, convertDate, checkEven } from "../utilities";

export default {
  computed: {
    ...mapGetters({
      commits: "getCommits",
      repositoryName: "getRepositoryName",
    }),
  },
  methods: {
    ...mapActions({ fetchCommits: "fetchCommits" }),
    convertStringTitle: convertStringTitle,
    convertDate: convertDate,
    checkEven: checkEven,
  },
  created() {
    this.fetchCommits(this.repositoryName);
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

.issue-wrapper {
  width: 100%;
  padding: $xs-size;
  background: $primary;
  border-left-width: $xs-size;
  border-left-style: solid;
  border-left-color: $success;
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
  font-size: $xs-size;
  margin: 0px;
  padding: 0px;
  color: $dark;
  font-weight: bold;
}
</style>
