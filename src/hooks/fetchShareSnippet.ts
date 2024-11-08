import {axiosInstance} from "./axios.config.ts";
import {Snippet} from "../utils/snippet.ts";
import axios from "axios";
import {toast} from "react-toastify";


const fetchShareSnippet = async (snippetId: string, userEmail: string | undefined, ownerEmail: string | undefined): Promise<Snippet> => {
    try {
        return await axiosInstance.post(`/snippets/share/${snippetId}`, {fromEmail: ownerEmail, toEmail: userEmail});
    } catch (error) {

        if (axios.isAxiosError(error)) {
            if (error.response?.status === 403) {
                toast.error("You do not have permission to share this snippet.");
                return error.response.data;
            }
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

export {fetchShareSnippet};
