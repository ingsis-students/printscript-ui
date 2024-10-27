import axios from "axios";
import { Snippet } from "../utils/snippet.ts";

export const useCreateSnippet = async (
    name: string,
    content: string,
    language: string,
    extension: string,
    token: string
): Promise<Snippet> => {
    try {
        const response = await axios.post(
            "/",
            { name, content, language, extension },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return response.data as Snippet;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};
