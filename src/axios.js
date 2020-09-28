import axios from "axios";

export const gitHubToken = process.env.VUE_APP_GITHUB_API_TOKEN;

export const githubAxiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${gitHubToken}`,
  },
});

axios.defaults.headers.get["Accepts"] = "application/json";
