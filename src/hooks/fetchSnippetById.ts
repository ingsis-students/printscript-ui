import axios from "axios";
import {Snippet} from "../utils/snippet.ts";

const fetchSnippetById = async (id: string, token: string): Promise<Snippet | undefined> => {
    try {
        const response = await axios.get(`/snippets/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

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