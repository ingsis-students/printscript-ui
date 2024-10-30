import axios from "axios";
import {Snippet} from "../utils/snippet.ts";
import {axiosInstance} from "./axios.config.ts";

export const useCreateSnippet = async (
    name: string,
    content: string,
    languageId: string,
    ownerEmail?: string
): Promise<Snippet> => {
    try {
        const response = await axiosInstance.post("/snippets/", {name, content, languageId, owner: ownerEmail});

        return response.data as Snippet;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};
