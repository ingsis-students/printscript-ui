import { Rule } from "../types/Rule";
import axios from "axios";

export function useModifyLintingRules() {
    const modifyRules = async (newRules: Rule[], token: string): Promise<Rule[]> => {
        try {
            const response = await axios.post(
                "/lint/rules",
                { rules: newRules },
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

    return { modifyRules };
}