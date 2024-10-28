import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8082/api",
    headers: {
        "Content-Type": "application/json",
    },
});

const setAuthorizationToken = (token: string) => {
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export { axiosInstance, setAuthorizationToken };
