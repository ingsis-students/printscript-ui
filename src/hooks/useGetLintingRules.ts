import { Rule } from "../types/Rule";
import axios from "axios";

export function useGetLintingRules() {
    const getLintingRules = async (token: string): Promise<Rule[]> => {
        try {
            const response = await axios.get(
                "http://localhost:8082/api/snippets/lint/rules",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            return response.data as Rule[];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || error.message);
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    };

    return { getLintRules: getLintingRules };
}