import axios from "axios";

const BASE_URL = "http://localhost:80/api";
// const BASE_URL= "https://ingsis-students.duckdns.org";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const setAuthorizationToken = (token: string) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export { axiosInstance, setAuthorizationToken };
