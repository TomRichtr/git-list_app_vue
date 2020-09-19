<template>
  <div class="top-wrapper">
    <div
      :class="[checkEvenRep(i), checkLanguageRep(rep.language)]"
      class="rep-wrapper"
      :id="rep.id"
      :key="rep.id"
      v-for="(rep, i) in reps"
      @click="goToRepDetail(rep.id, rep.name)"
    >
      <div class="rep-wrapper-link">
        <div class="row">
          <div class="col-sm rep-column-left">
            <p class="title title-left text-left">Name / Language</p>
            <a
              class="text text-link text-left"
              :title="rep.name"
              :href="rep.svn_url"
              >{{ convertStringTitle(rep.name) }} {{ slashCheck(rep.language) }}
              {{ convertString(rep.language) }}
              <font-awesome-icon
                class="link-marker"
                :icon="['fa', 'mouse']"
                size="sm"
            /></a>
          </div>
          <div class="col-sm rep-column-middle">
            <p class="title title-right text text-center">Description</p>
            <p class="text text text-center" :title="rep.description">
              {{ convertStringDescription(rep.description) }}
            </p>
          </div>
          <div class="col-sm rep-column-right">
            <p class="title title-right text-right">Created By</p>
            <a class="text text-link text-right" :href="rep.owner.html_url"
              >{{ rep.owner.login }}
              <font-awesome-icon
                class="link-marker"
                :icon="['fa', 'mouse']"
                size="sm"
            /></a>
          </div>
        </div>
        <div class="row">
          <div class="col-sm rep-column-left">
            <p class="title title-left text-left">Created At</p>
            <p class="text text-left">{{ convertDate(rep.created_at) }}</p>
          </div>
          <div class="col-sm rep-column-middle">
            <p class="title title-middle text-center">Last Update</p>
            <p class="text text-center">
              {{ convertDateRelative(rep.updated_at) }}
            </p>
          </div>
          <div class="col-sm rep-column-right">
            <p class="title title-right text-right">Number of Issues</p>
            <p class="text text-right">{{ rep.open_issues_count }}</p>
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
        name: "DetailPage",
        params: { id: id, repName: repName },
      });
      this.$store.dispatch("setStateRepName", repName);
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

.link-marker {
  margin-left: $xs-size/5;
  color: $color4;
}

.rep-wrapper-link {
  width: 100%;
  height: 100%;
  background: none;
  padding: 0px;
  margin: 0px;
  border: none;
}
.text-link {
  display: inline-block;
}
.rep-column-right {
  align-items: right;
  text-align: right;
}
.text-link.text-right {
  align-items: right;
  align-self: right;
}
.rep-wrapper {
  width: 100%;
  padding: $xs-size;
  background: $color1;
  border-left-width: $xs-size;
  border-left-style: solid;
}
.even-rep-wrapper {
  background-color: $color1;
  transition: background 1s ease, border 0.5s ease;
  &:hover {
    text-decoration: none;
    background-color: $color3;
    border-left-width: $xl-size;
    cursor: pointer;
  }
}
.odd-rep-wrapper {
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
