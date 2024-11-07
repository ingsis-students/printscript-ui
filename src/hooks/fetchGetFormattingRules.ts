import { Rule } from "../types/Rule";
import axios from "axios";
import {axiosSnippetService} from "./axios.config.ts";

export function fetchGetFormattingRules() {
    const getFormattingRules = async (): Promise<Rule[]> => {
        try {
            const response = await axiosSnippetService.get("/format/rules")
            return response.data as Rule[];
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || error.message);
            } else {
                throw new Error("An unexpected error occurred");
            }
        }
    };

    return { getFormattingRules: getFormattingRules };
}