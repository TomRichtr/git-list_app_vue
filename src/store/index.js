import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import Cookies from "js-cookie";
import { githubAxiosInstance } from "../axios";

Vue.use(Vuex);

const vuexCookie = new VuexPersistence({
  resetState: (key) => Cookies.getJSON(key),
  saveState: (key, state) => Cookies.set(key, state),
  reducer: (state) => ({
    repositoryName: state.repositoryName,
    repositoryId: state.repositoryId,
    headerOption: state.headerOption,
    userName: state.userName,
  }),
});

const vuexSession = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: (state) => ({
    repositoryName: state.repositoryName,
    repositoryId: state.repositoryId,
    headerOption: state.headerOption,
    userName: state.userName,
  }),
});

export default new Vuex.Store({
  state: {
    repositories: [],
    branches: [],
    commits: [],
    issues: [],
    repositoryName: "",
    repositoryId: 0,
    headerOption: "repository",
    userName: "",
    errorMessage: "",
  },
  mutations: {
    setRepositories(state, repositories) {
      state.repositories = repositories;
    },
    setBranches(state, branches) {
      state.branches = branches;
    },
    setCommits(state, commits) {
      state.commits = commits;
    },
    setIssues(state, issues) {
      state.issues = issues;
    },
    setRepositoryNameAndId(state, payload) {
      state.repositoryName = payload.repositoryName;
      state.repositoryId = payload.repositoryId;
    },
    setHeaderOption(state, headerOption) {
      state.headerOption = headerOption;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    setErrorMessage(state, errorMessage) {
      state.errorMessage = errorMessage;
    },
  },
  actions: {
    fetchRepositoriesOnUsersChange({ commit }, userName) {
      githubAxiosInstance
        .get(`users/${userName}/repos`)
        .then((res) => {
          commit("setRepositories", res.data);
          commit("setErrorMessage", "");
        })
        .catch((error) => commit("setErrorMessage", error.message));
      commit("setUserName", userName);
    },
    fetchRepositories({ commit, state }) {
      githubAxiosInstance
        .get(`users/${state.userName}/repos`)
        .then((res) => {
          commit("setRepositories", res.data);
          commit("setErrorMessage", "");
        })
        .catch((error) => commit("setErrorMessage", error.message));
    },
    fetchCommits({ commit, state }, repositoryName) {
      githubAxiosInstance
        .get(`repos/${state.userName}/${repositoryName}/commits?per_page=10`)
        .then((res) => {
          commit("setCommits", res.data);
          commit("setErrorMessage", "");
        })
        .catch((error) => commit("setErrorMessage", error.message));
    },
    fetchBranches({ commit, state }, repositoryName) {
      githubAxiosInstance
        .get(`repos/${state.userName}/${repositoryName}/branches`)
        .then((res) => {
          commit("setBranches", res.data);
          commit("setErrorMessage", "");
        })
        .catch((error) => commit("setErrorMessage", error.message));
    },
    fetchIssues({ commit, state }, repositoryName) {
      githubAxiosInstance
        .get(`repos/${state.userName}/${repositoryName}/issues`)
        .then((res) => {
          commit("setIssues", res.data);
          commit("setErrorMessage", "");
        })
        .catch((error) => commit("setErrorMessage", error.message));
    },
  },
  getters: {
    getRepositories: (state) => {
      return state.repositories;
    },
    getBranches: (state) => {
      return state.branches;
    },
    getCommits: (state) => {
      return state.commits;
    },
    getIssues: (state) => {
      return state.issues;
    },
    getRepositoryName: (state) => {
      return state.repositoryName;
    },
    getRepositoryId: (state) => {
      return state.repositoryId;
    },
    getHeaderOption: (state) => {
      return state.headerOption;
    },
    getUserName: (state) => {
      return state.userName;
    },
    getErrorMessage: (state) => {
      return state.errorMessage;
    },
  },
  plugins: [vuexCookie.plugin, vuexSession.plugin],
});
