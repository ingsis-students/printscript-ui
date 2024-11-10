import {FileType} from "../../types/FileType.ts";
import {Rule} from "../../types/Rule.ts";
import {TestCase} from "../../types/TestCase.ts";
import {TestCaseResult} from "../queries.tsx";
import {ComplianceEnum, CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "../snippet.ts";
import {SnippetOperations} from "../snippetOperations.ts";
import {PaginatedUsers} from "../users.ts";
import {useCreateSnippet} from "../../hooks/useCreateSnippet.ts";
import {fetchFileTypes} from "../../hooks/fetchFileTypes.ts";
import {fetchSnippetById} from "../../hooks/fetchSnippetById.ts";
import {fetchModifyLintingRules} from "../../hooks/fetchModifyLintingRules.ts";
import {fetchGetLintingRules} from "../../hooks/fetchGetLintingRules.ts";
import {fetchGetFormattingRules} from "../../hooks/fetchGetFormattingRules.ts";
import {User} from "@auth0/auth0-react";
import {axiosInstance} from "../../hooks/axios.config.ts";
import { fetchModifyFormattingRules } from "../../hooks/fetchModifyFormattingRules.ts";
import {fetchUpdateSnippet} from "../../hooks/fetchUpdateSnippet.ts";
import {fetchUserFriends} from "../../hooks/fetchUserFriends.ts";
import {fetchShareSnippet} from "../../hooks/fetchShareSnippet.ts";
import fetchFormatSnippet from "../../hooks/fetchFormatSnippet.ts";


export class SnippetServiceOperations implements SnippetOperations {
    private user?: User;

    constructor(user?: User) {
        this.user = user
    }

    async listSnippetDescriptors(page: number, pageSize: number, snippetName?: string | undefined): Promise<PaginatedSnippets> {
        const userId = this.user?.sub
        const response = await axiosInstance('/snippets/user', {
            params: {
                page,
                pageSize,
                snippetName,
                userId
            },
        });

        return {
            page,
            page_size: pageSize,
            count: response.data.count,
            snippets: response.data.snippets.map(mapToSnippet)
        } as PaginatedSnippets;
    }

    createSnippet = async (createSnippet: CreateSnippet): Promise<Snippet> => {
        const {name, content, language} = createSnippet;
        const owner = this.user?.email
        return await useCreateSnippet(name, content, language, owner);
    };

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        return await fetchSnippetById(id);
    }

    async updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        return await fetchUpdateSnippet(id, updateSnippet.content);
    }

    async getUserFriends(name?: string | undefined, page?: number | undefined, pageSize?: number | undefined): Promise<PaginatedUsers> {
        const email = this.user?.email;
        return await fetchUserFriends(name, page, pageSize, email);
    }

    async shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        const ownerEmail = this.user?.email;
        const user = await this.getUserById(userId);
        return await fetchShareSnippet(snippetId, user.email, ownerEmail);
    }

    async getUserById(id: string): Promise<User> {
        const user = await axiosInstance.get(`/user/get/${id}`);
        if (user) {
            return user.data;
        } else {
            throw new Error("User not found");
        }
    }

    async getFormatRules(): Promise<Rule[]> {
        const {getFormattingRules} = fetchGetFormattingRules();
        try {
            return await getFormattingRules();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to fetch linting rules: " + error.message);
            } else {
                throw new Error("Failed to fetch linting rules: An unexpected error occurred");
            }
        }
    }

    async getLintingRules(): Promise<Rule[]> {
        const {getLintRules} = fetchGetLintingRules();
        try {
            return await getLintRules();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to fetch linting rules: " + error.message);
            } else {
                throw new Error("Failed to fetch linting rules: An unexpected error occurred");
            }
        }
    }

    async formatSnippet(snippet: string): Promise<string> {
        return await fetchFormatSnippet(snippet);
    }

    async getTestCases(snippetId: string): Promise<TestCase[]> {
        if (!snippetId) {
            throw new Error("For what snippet id you want the tests?");
        }

        const response = await axiosInstance.get(`tests/snippet/${snippetId}`);
        return Array.isArray(response.data) ? response.data : [];
    }

    async postTestCase(testCase: Partial<TestCase>, snippetId: string): Promise<TestCase> {
        if (!testCase.input || !testCase.output) {
            throw new Error("Test case must have input and output");
        }
        if (!snippetId) {
            throw new Error("Test case must have a snippet id");
        }
        const response = await axiosInstance.post(`tests/snippet/${snippetId}`, testCase);
        return response.data;
    }

    async removeTestCase(id: string): Promise<string> {
        const response = await axiosInstance.delete(`/tests/${id}`);
        return response.data;
    }


    async deleteSnippet(id: string): Promise<string> {
        try {
            await axiosInstance.post(`/snippets/delete/${id}`);
            return `Snippet of id: ${id} deleted successfully`;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to delete snippet: " + error.message);
            } else {
                throw new Error("Failed to delete snippet: An unexpected error occurred");
            }
        }
    }

    async testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        if (!testCase.id) {
            throw new Error("Test case ID is required");
        }
        const response = await axiosInstance.post<string>(`/tests/${testCase.id}/run`);
        return response.data as TestCaseResult;
    }

    async getFileTypes(): Promise<FileType[]> {
        return fetchFileTypes();
    }

    async modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        const {modifyRules} = fetchModifyFormattingRules();
        try {
            return await modifyRules(newRules);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to modify formatting rules: " + error.message);
            } else {
                throw new Error("Failed to modify formatting rules: An unexpected error occurred");
            }
        }
    }

    async modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        const {modifyRules} = fetchModifyLintingRules();
        try {
            return await modifyRules(newRules);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to modify linting rules: " + error.message);
            } else {
                throw new Error("Failed to modify linting rules: An unexpected error occurred");
            }
        }
    }
}

const mapToSnippet = (snippet: SnippetResponse): Snippet => ({
    id: snippet.id,
    name: snippet.name,
    content: snippet.content,
    language: snippet.language,
    extension: snippet.extension,
    status: (snippet.status as ComplianceEnum) || 'pending',
    author: snippet.owner,
    owner: snippet.owner
});

type SnippetResponse = {
    id: string;
    name: string;
    content: string;
    language: string;
    extension: string;
    status?: string;
    owner: string;
}