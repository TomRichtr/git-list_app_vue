<template>
  <div class="main-wrapper">
    <div
      :class="[checkEvenRep(i), checkLanguageRep(rep.language)]"
      class="rep-wrapper"
      :id="rep.id"
      :key="rep.id"
      v-for="(rep, i) in reps"
      @click="goToRepDetail(rep.id, rep.name)"
    >
      <div class="row rep-wrapper-link">
        <div class="col-sm-6 col-md-4 col-lg-4 name">
          <p class="title">Name / Language</p>
          <a class="text" :title="rep.name" :href="rep.svn_url" target="_blank">
            {{ convertStringTitle(rep.name) }} {{ slashCheck(rep.language) }}
            {{ convertString(rep.language) }}
            <font-awesome-icon
              class="link-marker"
              :icon="['fa', 'mouse']"
              size="sm"
            />
          </a>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 description">
          <p class="title">Description</p>
          <p class="text" :title="rep.description">
            {{ convertStringDescription(rep.description) }}
          </p>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 created-by">
          <p class="title">Created By</p>
          <a class="text" :href="rep.owner.html_url" target="_blank">
            {{ rep.owner.login }}
            <font-awesome-icon
              class="link-marker"
              :icon="['fa', 'mouse']"
              size="sm"
            />
          </a>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 created-at">
          <p class="title">Created At</p>
          <p class="text">{{ convertDate(rep.created_at) }}</p>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 last-update">
          <p class="title">Last Update</p>
          <p class="text">
            {{ convertDateRelative(rep.updated_at) }}
          </p>
        </div>
        <div class="col-sm-6 col-md-4 col-lg-4 number-of-issues">
          <p class="title">Number of Issues</p>
          <p class="text">{{ rep.open_issues_count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  created() {
    this.$store.dispatch("fetchReps");
  },
  computed: {
    reps() {
      return this.$store.getters.repsGetter;
    },
  },
  methods: {
    goToRepDetail(id, repName) {
      this.$router.push({
        name: "CommitsPage",
        params: { id: id },
      });
      this.$store.dispatch("setStateRepName", { repName: repName, id: id });
      this.$store.dispatch("setHeaderOption", "commits");
    },
    getRate() {
      this.$store.dispatch("fetchRate");
    },
    convertDate(date) {
      return moment(date).format("Do MMM YYYY, h:mm");
    },
    convertDateRelative(date) {
      return moment(date).fromNow();
    },
    convertString(string) {
      return string === null
        ? ""
        : string.charAt(0).toUpperCase() + string.slice(1);
    },
    slashCheck(language) {
      return language === null ? "" : "/";
    },
    convertStringTitle(string) {
      const stringAdjusted =
        string === null ? "" : string.charAt(0).toUpperCase() + string.slice(1);
      return stringAdjusted.length > 25
        ? stringAdjusted.slice(0, 25) + "..."
        : stringAdjusted;
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
    checkEvenRep(i) {
      return i % 2 === 0 ? "even-rep-wrapper" : "odd-rep-wrapper";
    },
    checkLanguageRep(language) {
      switch (language) {
        case "JavaScript":
          return "javascript";
        case "Python":
          return "python";
        case "Java":
          return "java";
        case "C++":
          return "cplusplus";
        case "C":
          return "c";
        case "PHP":
          return "php";
        case "C#":
          return "chash";
        case "Shell":
          return "shell";
        case "Go":
          return "go";
        case "TypeScript":
          return "typescript";
        case "Vue":
          return "vue";
        case "Ruby":
          return "ruby";
        case "Arduino":
          return "arduiono";
        case "Objective-C":
          return "objective-c";
        case "PLpgSQL":
          return "plpgsql";
        default:
          return "undefined";
      }
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
  @media (max-width: $sm) {
    margin-top: $l-size * 1.3;
  }
}

.link-marker {
  margin-left: $xs-size/5;
  color: $secondary;
}

.rep-wrapper-link {
  width: 100%;
  height: 100%;
  background: none;
  padding: $xs-size;
  margin: 0px;
  border: none;
}

.even-rep-wrapper {
  background-color: $primary;
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    text-decoration: none;
    background-color: $danger;
    border-left-width: $xl-size;
    cursor: pointer;
  }
}
.odd-rep-wrapper {
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
  margin: 0px;
  padding: 0px;
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
