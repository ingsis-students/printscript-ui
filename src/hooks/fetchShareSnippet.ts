import {axiosSnippetService} from "./axios.config.ts";
import {Snippet} from "../utils/snippet.ts";


const fetchShareSnippet = async (snippetId: string, userEmail: string | undefined, ownerEmail: string | undefined): Promise<Snippet> => {
    try {
        return await axiosSnippetService.post(`/snippets/share/${snippetId}`, {fromEmail: ownerEmail, toEmail: userEmail});
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Failed to share snippet: " + error.message);
        } else {
            throw new Error("Failed to share snippet: An unexpected error occurred");
        }
    }
}

export {fetchShareSnippet};
