/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAxiosInstance } from "./axios"
import profilePic from "@/assets/images/wave-bg.png";
export const convertDateToMonth = (date: string) => {
    const str = date.slice(5)
    switch (str) {
        case '01':
            return 'Jan'
        case '02':
            return 'Feb'
        case '03':
            return 'Mar'
        case '04':
            return 'Apr'
        case '05':
            return 'May'
        case '06':
            return 'Jun'
        case '07':
            return 'Jul'
        case '08':
            return 'Aug'
        case '09':
            return 'Sep'
        case '10':
            return 'Oct'
        case '11':
            return 'Nov'
        case '12':
            return 'Dec'
        default:
            return 'Invalid date'
    }
}

export const getImageUrl = (subPath: string): string => {
    return `${process.env.NEXT_PUBLIC_AWS_BUCKET_PATH}${subPath}`
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getMediaUrlFromFlaskProxy = async (subpath: string): Promise<string | undefined> => {
    try {
        const axiosInstance = await getAxiosInstance();
        const response = await axiosInstance.post(`/file`, { subpath }, {
            responseType: 'arraybuffer'
        })

        // Convert the arraybuffer to a Blob 
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        return URL.createObjectURL(blob);
    } catch (error) {
        return undefined;
    }
}

export const getImage = async(data: any) => {
    return data.profilePic?.includes('lh3.googleusercontent.com') ? data.profilePic : data.profilePic ? await getMediaUrlFromFlaskProxy(data.profilePic) : profilePic
}

export const getAvatarImageUrl = async(avatar: any) => {
    return avatar.avatarUrl ? await getMediaUrlFromFlaskProxy(avatar.avatarUrl) : profilePic
}

export const getAvatarsUsedFromFlask = async (avatar: any) => {
   return avatar ? await getMediaUrlFromFlaskProxy(avatar) : profilePic
}