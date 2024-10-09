import axios from "axios";
import { getTokenCustom } from "@/actions";

export const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    headers: {
        [process.env.NEXT_ADMIN_HEADER_KEY as string]: process.env.NEXT_ADMIN_HEADER_VALUE as string,
        'Content-Type': 'application/json'
    }
})

const createAuthInstance = async () => {
    try {
        const token = await getTokenCustom();
        return axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
            headers: {
                Authorization: `Bearer ${token}`,
                [process.env.NEXT_ADMIN_HEADER_KEY as string]: process.env.NEXT_ADMIN_HEADER_VALUE as string,
                'Content-Type': 'application/json'
            },
        })
    } catch (error) {
        console.error('Error getting token:', error);
        throw error
    }
};

export const getAxiosInstance = async () => {
    return await createAuthInstance()
};