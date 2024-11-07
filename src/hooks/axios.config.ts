import axios from "axios";

const BASE_URL = "http://172.27.0.11:80";
// const BASE_URL = "http://localhost:80";

const axiosSnippetService = axios.create({
    baseURL: BASE_URL + "/api",
    // baseURL: "http://localhost:8082/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

const axiosPermissionService = axios.create({
    // baseURL: "http://localhost:8083/api/user",
    baseURL: BASE_URL + "/api/user",
    headers: {
        "Content-Type": "application/json",
    },
});

const setAuthorizationToken = (token: string) => {
    axiosSnippetService.defaults.headers['Authorization'] = `Bearer ${token}`;
    axiosPermissionService.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export { axiosSnippetService, axiosPermissionService, setAuthorizationToken };
