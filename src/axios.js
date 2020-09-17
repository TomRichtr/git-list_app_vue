import axios from "axios";

export const gitHubToken = "08e03882bcdaf7413c2cfd41cb17b3104dad8a1c";
export const gitHubUser = "Inza";
export const githubAxiosInstance = axios.create({
  baseURL: "https://api.github.com",
});

axios.defaults.headers.get["Accepts"] = "application/json";
