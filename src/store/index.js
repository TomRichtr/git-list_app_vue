import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Cookies from "js-cookie";
import { githubAxiosInstance, gitHubUser } from "../axios";

Vue.use(Vuex);

const vuexCookie = new VuexPersistence({
  restoreState: (key) => Cookies.getJSON(key),
  saveState: (key, state) =>
    Cookies.set(key, state, {
      expires: 1,
    }),
  reducer: (state) => ({
    repName: state.repName,
    id: state.id,
    option: state.option,
  }),
});

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({
    repName: state.repName,
    id: state.id,
    option: state.option,
  }),
});

export default new Vuex.Store({
  state: {
    reps: [],
    branches: [],
    commits: [],
    issues: [],
    repName: "",
    id: "",
    option: "rep",
  },
  mutations: {
    storeReps(state, repsList) {
      state.reps = repsList;
    },
    storeBranches(state, branchesList) {
      state.branches = branchesList;
    },
    storeCommits(state, commitsList) {
      state.commits = commitsList;
    },
    storeIssues(state, issuesList) {
      state.issues = issuesList;
    },
    storeRepName(state, repName) {
      state.repName = repName;
    },
    storeId(state, id) {
      state.id = id;
    },
    storeHeaderOption(state, option) {
      state.option = option;
    },
  },
  actions: {
    setHeaderOption({ commit }, option) {
      commit("storeHeaderOption", option);
    },
    setStateRepName({ commit }, IdAndRepName) {
      commit("storeRepName", IdAndRepName.repName);
      commit("storeId", IdAndRepName.id);
    },
    fetchReps({ commit }) {
      githubAxiosInstance
        .get(`users/${gitHubUser}/repos`)
        .then((res) => {
          commit("storeReps", res.data);
        })
        .catch((error) => console.log(error));
    },
    fetchCommits({ commit }, repName) {
      githubAxiosInstance
        .get(`repos/${gitHubUser}/${repName}/commits`)
        .then((res) => {
          const commitsSorted = res.data.sort((a, b) => {
            return Date.parse(a.commit.author.date) >
              Date.parse(b.commit.author.date)
              ? -1
              : 1;
          });
          const commitsSliced = commitsSorted.slice(0, 10);
          commit("storeCommits", commitsSliced);
        })
        .catch((error) => console.log(error));
    },
    fetchBranches({ commit }, repName) {
      githubAxiosInstance
        .get(`repos/${gitHubUser}/${repName}/branches`)
        .then((res) => {
          commit("storeBranches", res.data);
        })
        .catch((error) => console.log(error));
    },
    fetchIssues({ commit }, repName) {
      githubAxiosInstance
        .get(`repos/${gitHubUser}/${repName}/issues`)
        .then((res) => {
          commit("storeIssues", res.data);
        })
        .catch((error) => console.log(error));
    },
  },
  getters: {
    repsGetter: (state) => {
      return state.reps;
    },
    branchesGetter: (state) => {
      return state.branches;
    },
    commitsGetter: (state) => {
      return state.commits;
    },
    issuesGetter: (state) => {
      return state.issues;
    },
    repNameGetter: (state) => {
      return state.repName;
    },
    repIdGetter: (state) => {
      return state.id;
    },
    headerOptionGetter: (state) => {
      return state.option;
    },
  },
  plugins: [vuexCookie.plugin, vuexLocal.plugin],
});
