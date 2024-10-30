import {FileType} from "../../types/FileType.ts";
import {Rule} from "../../types/Rule.ts";
import {TestCase} from "../../types/TestCase.ts";
import {TestCaseResult} from "../queries.tsx";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "../snippet.ts";
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


export class SnippetServiceOperations implements SnippetOperations {
    private user?: User;

    constructor(user?: User) {
        this.user = user
    }

    async listSnippetDescriptors(page: number, pageSize: number, snippetName?: string | undefined): Promise<PaginatedSnippets> {
        const response = await axiosInstance('/snippets', {
            params: {
                page,
                pageSize,
                snippetName,
            },
        });
        return response.data;
    }

    createSnippet = async (createSnippet: CreateSnippet): Promise<Snippet> => {
        const {name, content, language} = createSnippet;
        try {
            const owner = this.user?.email
            return await useCreateSnippet(name, content, language, owner);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to create snippet: " + error.message);
            } else {
                throw new Error("Failed to create snippet: An unexpected error occurred");
            }
        }
    };

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        try {
            return await fetchSnippetById(id);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Failed to fetch snippet: " + error.message);
            } else {
                throw new Error("Failed to fetch snippet: An unexpected error occurred");
            }
        }
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        console.log(id, updateSnippet);
        throw new Error("Method not implemented.");
    }

    getUserFriends(name?: string | undefined, page?: number | undefined, pageSize?: number | undefined): Promise<PaginatedUsers> {
        console.log(name, page, pageSize);
        throw new Error("Method not implemented.");
    }

    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        console.log(snippetId, userId);
        throw new Error("Method not implemented.");
    }

    async getFormatRules(): Promise<Rule[]> {
        const { getFormattingRules } = fetchGetFormattingRules();
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
        const { getLintRules } = fetchGetLintingRules();
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

    getTestCases(snippetId: string): Promise<TestCase[]> {
        console.log(snippetId);
        throw new Error("Method not implemented.");
    }

    formatSnippet(snippet: string): Promise<string> {
        console.log(snippet);
        throw new Error("Method not implemented.");
    }

    postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
        console.log(testCase);
        throw new Error("Method not implemented.");
    }

    removeTestCase(id: string): Promise<string> {
        console.log(id);
        throw new Error("Method not implemented.");
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

    testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        console.log(testCase);
        throw new Error("Method not implemented.");
    }

    async getFileTypes(): Promise<FileType[]> {
       return fetchFileTypes();
    }

    modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        console.log(newRules);
        throw new Error("Method not implemented.");
    }

    async modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        const { modifyRules } = fetchModifyLintingRules();
        try {
            return await modifyRules(newRules);
        } catch(error) {
            if (error instanceof Error) {
                throw new Error("Failed to modify linting rules: " + error.message);
            } else {
                throw new Error("Failed to modify linting rules: An unexpected error occurred");
            }
        }
    }
}
