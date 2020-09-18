import Vue from "vue";
import Vuex from "vuex";
import { githubAxiosInstance, gitHubUser } from "../axios";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { reps: [], branches: [], commits: [], issues: [] },
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
  },
  actions: {
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
    goToDetail({ dispatch }, parameters) {
      dispatch("fetchIssues", parameters.repName);
      dispatch("fetchBranches", parameters.repName);
      dispatch("fetchCommits", parameters.repName);
      router.push(`/${parameters.id}`);
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
  },
});
