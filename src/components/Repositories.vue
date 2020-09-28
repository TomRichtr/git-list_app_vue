<template>
  <div class="main-wrapper">
    <p class="no-repositories" v-if="repositoriesLength != false">
      {{ repositoriesLength }}
    </p>
    <div
      :class="checkEven(i)"
      class="row item-wrapper"
      :style="{ borderLeftColor: checkLanguageRepository(repository.language) }"
      :id="repository.id"
      :key="repository.id"
      v-for="(repository, i) in repositories"
      @click="goToRepositoryDetail(repository.id, repository.name)"
    >
      <div class="col-sm-6 col-md-4 col-lg-4 name">
        <p class="title">Name / Language</p>
        <a
          class="text"
          :title="repository.name"
          :href="repository.svn_url"
          target="_blank"
        >
          {{ convertStringTitle(repository.name) }}
          {{ slashCheck(repository.language) }}
          {{ convertString(repository.language) }}
          <font-awesome-icon
            class="link-marker"
            :icon="['fa', 'mouse']"
            size="sm"
          />
        </a>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-4 description">
        <p class="title">Description</p>
        <p class="text" :title="repository.description">
          {{ convertStringDescription(repository.description) }}
        </p>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-4 created-by">
        <p class="title">Created By</p>
        <a class="text" :href="repository.owner.html_url" target="_blank">
          {{ repository.owner.login }}
          <font-awesome-icon
            class="link-marker"
            :icon="['fa', 'mouse']"
            size="sm"
          />
        </a>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-4 created-at">
        <p class="title">Created At</p>
        <p class="text">{{ convertDate(repository.created_at) }}</p>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-4 last-update">
        <p class="title">Last Update</p>
        <p class="text">
          {{ convertDateRelative(repository.updated_at) }}
        </p>
      </div>
      <div class="col-sm-6 col-md-4 col-lg-4 number-of-issues">
        <p class="title">Number of Issues</p>
        <p class="text">{{ repository.open_issues_count }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
  checkEven,
  convertDate,
  convertDateRelative,
  convertString,
  convertStringDescription,
  convertStringTitle,
  slashCheck,
} from "../utilities";
import colors from "../assets/colors.json";

export default {
  computed: {
    ...mapGetters({ repositories: "getRepositories" }),
    repositoriesLength() {
      return this.repositories === null ? "No repositories to show" : false;
    },
  },
  methods: {
    ...mapMutations({
      setRepositoryNameAndId: "setRepositoryNameAndId",
      setHeaderOption: "setHeaderOption",
    }),
    ...mapActions({ fetchRepositories: "fetchRepositories" }),
    checkEven: checkEven,
    convertDate: convertDate,
    convertDateRelative: convertDateRelative,
    convertString: convertString,
    convertStringDescription: convertStringDescription,
    convertStringTitle: convertStringTitle,
    slashCheck: slashCheck,
    goToRepositoryDetail(repositoryId, repositoryName) {
      this.$router.push({
        name: "CommitsPage",
        params: { repositoryId: repositoryId },
      });
      this.setRepositoryNameAndId({
        repositoryName: repositoryName,
        repositoryId: repositoryId,
      });
      this.setHeaderOption("commits");
    },
    checkLanguageRepository(language) {
      return colors[language] === undefined
        ? "#FFFF00"
        : colors[language].color;
    },
  },
  created() {
    this.fetchRepositories();
  },
};
</script>

<style scoped lang="scss">
@import "../../scss/variables.scss";

.no-repositories {
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
    cursor: pointer;
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
  margin: 0;
  padding: 0;
  white-space: nowrap;
}
.title {
  color: $dark;
  font-size: $xs-size;
  font-weight: bold;
  margin: 0;
  padding: 0;
}
.name {
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
.description {
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
.created-by {
  text-align: right;
  @media (max-width: $md) {
    text-align: left !important;
  }
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
.number-of-issues {
  text-align: right;
  @media (max-width: $sm) {
    text-align: center !important;
  }
}
</style>
