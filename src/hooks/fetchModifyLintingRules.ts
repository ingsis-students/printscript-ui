import {Rule} from "../types/Rule";
import axios from "axios";
import {axiosInstance} from "./axios.config.ts";

export function fetchModifyLintingRules() {
    const modifyRules = async (newRules: Rule[]): Promise<Rule[]> => {
        try {
            const response = await axiosInstance.post("/snippets/lint/rules", newRules)
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