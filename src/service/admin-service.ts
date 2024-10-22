/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "@/utils/axios";
import { axiosInstance } from "@/utils/axios"

export const loginService = async (payload: any) => await axiosInstance.post(`/admin/login`, payload)


export const getDashboardStatsService = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}

// Users and Income Tables
export const getAllUserService = async (routhWithQuery: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(routhWithQuery)
}

export const getASingleUserService = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}

export const getIncomeService = async (routeWithQuery: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(routeWithQuery)
}

// Notificaiton and Newsletter
export const sendNewsletterService = async (payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post('/admin/send-latest-updates', payload)
}

export const sendNotificationToAllService = async (payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post('/admin/send-notification', payload)
}

export const sendNotificationToSpecificUsers = async(payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post('/admin/send-notification-to-specific-users', payload)
}

// Avatars
export const addAvatarService = async (route: string, payload: any) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.post(route, payload)
}

export const getAvatarsService = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.get(route)
}

export const deleteAvatarService = async (route: string) => {
    const axiosInstance = await getAxiosInstance()
    return axiosInstance.delete(route)
}