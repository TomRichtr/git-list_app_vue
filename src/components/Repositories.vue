<template>
  <div class="main-wrapper">
    <div
      :class="[checkEven(i), checkLanguageRepository(repository.language)]"
      class="repository-wrapper"
      :id="repository.id"
      :key="repository.id"
      v-for="(repository, i) in repositories"
      @click="goToRepositoryDetail(repository.id, repository.name)"
    >
      <div class="row repository-wrapper-link">
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
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import {
  convertDate,
  convertDateRelative,
  convertString,
  slashCheck,
  convertStringTitle,
  convertStringDescription,
  checkEven,
  checkLanguageRepository,
} from "../utilities";

export default {
  computed: {
    ...mapGetters({ repositories: "getRepositories" }),
  },
  methods: {
    ...mapMutations({
      setRepositoryNameAndId: "setRepositoryNameAndId",
      setHeaderOption: "setHeaderOption",
    }),
    ...mapActions({ fetchRepositories: "fetchRepositories" }),
    convertDate: convertDate,
    convertDateRelative: convertDateRelative,
    convertString: convertString,
    slashCheck: slashCheck,
    convertStringTitle: convertStringTitle,
    convertStringDescription: convertStringDescription,
    checkEven: checkEven,
    checkLanguageRepository: checkLanguageRepository,
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
  },
  created() {
    this.fetchRepositories();
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

.repository-wrapper-link {
  width: 100%;
  height: 100%;
  background: none;
  padding: $xs-size;
  margin: 0;
  border: none;
}
//spoojit a zjednodusit
.even-wrapper {
  background-color: $primary;
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    text-decoration: none;
    background-color: $danger;
    border-left-width: $xl-size;
    cursor: pointer;
  }
}
.odd-wrapper {
  background-color: darken($color: $primary, $amount: 15%);
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    text-decoration: none;
    background-color: $danger;
    border-left-width: $xl-size;
    cursor: pointer;
  }
}
.text {
  margin: 0;
  padding: 0;
  color: $secondary;
  white-space: nowrap;
}

.title {
  font-size: $xs-size;
  margin: 0px;
  padding: 0px;
  color: $dark;
  font-weight: bold;
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

.javascript {
  border-left-color: #f1e05a;
}
.python {
  border-left-color: #3572a5;
}
.java {
  border-left-color: #b07219;
}
.cplusplus {
  border-left-color: #6866fb;
}
.c {
  border-left-color: #438eff;
}
.php {
  border-left-color: #4f5d95;
}
.chash {
  border-left-color: #178600;
}
.shell {
  border-left-color: #89e051;
}
.go {
  border-left-color: #00add8;
}
.typescript {
  border-left-color: #2b7489;
}
.vue {
  border-left-color: #2c3e50;
}
.ruby {
  border-left-color: #701516;
}
.arduiono {
  border-left-color: #007678;
}
.objective-c {
  border-left-color: #438eff;
}
.plpgsql {
  border-left-color: #dad8d8;
}
</style>
