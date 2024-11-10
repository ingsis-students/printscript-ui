import {axiosInstance} from "./axios.config.ts";

export const fetchGetDefaultRules = async (): Promise<void> => {
    try {
        await axiosInstance.get("/snippets/rules/default");
        console.log("Default rules set successfully.");
    } catch (error) {
        console.error("Failed to set default rules:", error);
        throw error;
    }
};
