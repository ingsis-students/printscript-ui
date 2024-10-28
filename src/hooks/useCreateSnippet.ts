import axios from "axios";
import {Snippet} from "../utils/snippet.ts";
import {axiosInstance} from "./axios.config.ts";

interface Language {
    name: string,
    version: string,
    extension: string,
}

export const useCreateSnippet = async (
    name: string,
    content: string,
    language: string,
    extension: string,
): Promise<Snippet> => {
    try {
        const owner: string = "owner"; // FIXME Esto sería el usuario que lo creo
        const requestLanguage: Language = {name: language, version: "1.0", extension: extension};

        const response = await axiosInstance.post("/snippets/", {name, content, requestLanguage, owner});

        return response.data as Snippet;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};
