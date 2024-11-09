import {axiosInstance} from "./axios.config.ts";


const fetchFormatSnippet = async (code: string): Promise<string> => {
    try {
        const response = await axiosInstance.post("/printscript/format", {
            code,
        });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Failed to format snippet: " + error.message);
        } else {
            throw new Error("Failed to format snippet: An unexpected error occurred");
        }
    }
}

export default fetchFormatSnippet;