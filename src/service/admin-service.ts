/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios"

export const loginService = async (payload: any) => await axiosInstance.post(`/admin/login`, payload)


export const getDashboardStatsService = async(route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}


export const getAllUserService = async(routhWithQuery: string) => { 
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(routhWithQuery)
}