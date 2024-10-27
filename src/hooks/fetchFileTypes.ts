import axios from "axios";
import { FileType } from "../types/FileType";
axios.defaults.baseURL = "http://localhost:8082/api/languages";

export const fetchFileTypes = async (token: string): Promise<FileType[]> => {
    try {
        console.log("TOKEN",token);
        const response = await axios.get("/all", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        if (response.data === undefined) {
            return [];
        }
        return response.data as FileType[];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};

