/* eslint-disable @typescript-eslint/no-explicit-any */
// import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios"

export const loginService = async (payload: any) => await axiosInstance.post(`/admin/login`, payload)

