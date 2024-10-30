import {User} from "@auth0/auth0-react";
import axios from "axios";


export const fetchCreateUser = async (token: string, email: string): Promise<User> => {

    try {
        const response = await axios.post<User>("http://localhost:8083/api/user/", {email}, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }

}