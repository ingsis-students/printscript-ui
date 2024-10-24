import axios from "axios";
import { FileType } from "../types/FileType";

export const fetchFileTypes = async (token: string): Promise<FileType[]> => {
    try {
        const response = await axios.get("/extensions", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response.data as FileType[];
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};
