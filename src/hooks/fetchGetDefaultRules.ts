import axios from "axios";

export const fetchGetDefaultRules = async (token: string): Promise<void> => {
    try {
        await axios.get(
            "http://localhost:8082/api/snippets/rules/default",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Default rules set successfully.");
    } catch (error) {
        console.error("Failed to set default rules:", error);
        throw error;
    }
};
