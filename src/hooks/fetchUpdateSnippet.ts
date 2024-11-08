import {Snippet} from "../utils/snippet.ts";
import {axiosInstance} from "./axios.config.ts";
import axios from "axios";


const fetchUpdateSnippet = async (id: string, content: string): Promise<Snippet> => {
    try {
        const response = await axiosInstance.put(`/snippets/${id}`, {content})

        return response.data as Snippet;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export {fetchUpdateSnippet};