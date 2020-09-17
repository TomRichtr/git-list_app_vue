import Vue from "vue";
import Vuex from "vuex";
import { githubAxiosInstance } from "../axios";
import { gitHubUser } from "../axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { reps: [], branches: [], commits: [] },
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
    storeRate(state, rate) {
      state.rate = rate;
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
    fetchCommits({ commit }, repId) {
      githubAxiosInstance
        .get(`repos/${gitHubUser}/${repId}/commits`)
        .then((res) => {
          commit("storeBranches", res.data);
        })
        .catch((error) => console.log(error));
    },
    fetchBranches({ commit }, repId) {
      githubAxiosInstance
        .get(`repos/${gitHubUser}/${repId}/branches`)
        .then((res) => {
          commit("storeBranches", res.data);
        })
        .catch((error) => console.log(error));
    },
    fetchRate({ commit }) {
      githubAxiosInstance
        .get(`rate_limit`)
        .then((res) => {
          commit("storeRate", res.data);
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
  },
});
