import {axiosPermissionService} from "./axios.config.ts";
import axios from "axios";
import {PaginatedUsers} from "../utils/users.ts";

const fetchUserFriends = async (name?: string, page?: number, pageSize?: number, email?: string): Promise<PaginatedUsers> => {
    try {
        const response = await axiosPermissionService.get('/', {
            params: {
                name,
                page,
                pageSize,
            },
        });

        const filteredUsers = response.data.filter((user: UserResponse) => user.email !== email);

        return {
            page: page ?? 1,
            page_size: pageSize ?? response.data.length,
            count: response.data.length,
            users: filteredUsers.map(mapToUser),
        } as PaginatedUsers;

    } catch (error) {
        console.error("Error fetching user friends:", error);
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }

}

export {fetchUserFriends};

const mapToUser = (user: UserResponse) => {
    return {
        id: user.id,
        name: user.email,
    }
}

type UserResponse = {
    id: string;
    email: string;
    auth0Id: string;
}