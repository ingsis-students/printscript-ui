import axios from "axios";
import { FileType } from "../types/FileType";
import {axiosInstance} from "./axios.config.ts";

interface ApiResponseItem {
    name: string;
    extension: string;
}

export const fetchFileTypes = async (): Promise<FileType[]> => {
    try {
        const response = await axiosInstance.get("/languages/all")

        if (response.data === undefined) {
            return [];
        }
        console.log("Data",response.data)

        return response.data.map((item: ApiResponseItem) => ({
            language: item.name,
            extension: item.extension
        })) as FileType[];

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};

