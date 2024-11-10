import {Rule} from "../types/Rule.ts";
import {axiosInstance} from "./axios.config.ts";
import axios from "axios";

export function fetchModifyFormattingRules() {
    const modifyRules = async (newRules: Rule[]): Promise<Rule[]> => {
        try {
            const response = await axiosInstance.post("/snippets/format/rules", newRules)
            return response.data as Rule[];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || error.message);
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    };

    return {modifyRules};
}