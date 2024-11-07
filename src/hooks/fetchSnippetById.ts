import axios from "axios";
import {Snippet} from "../utils/snippet.ts";
import {axiosSnippetService} from "./axios.config.ts";

const fetchSnippetById = async (id: string): Promise<Snippet | undefined> => {
    try {
        const response = await axiosSnippetService.get(`/snippets/${id}`)

        return response.data as Snippet;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export {fetchSnippetById};