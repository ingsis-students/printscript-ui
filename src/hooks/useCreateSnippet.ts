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

        return {
            id: response.data.id,
            name: response.data.name,
            content: response.data.content,
            language: response.data.language,
            extension: response.data.extension,
            status: response.data.compilance,
            author: response.data.owner
        } as Snippet
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};
