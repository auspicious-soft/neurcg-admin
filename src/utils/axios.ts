/* eslint-disable @typescript-eslint/no-var-requires */
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

import axios from "axios";
import { getTokenCustom } from "@/actions";
// import https from "https";

export const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'role' : 'admin' 
    },
    // httpsAgent: new https.Agent({ 
    //     rejectUnauthorized: false,
    //     requestCert: false,
    //     secureOptions: require('constants').SSL_OP_NO_TLSv1_2
    // })
})

const createAuthInstance = async () => {
    try {
        const token = await getTokenCustom();
        return axios.create({
            baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,
            headers: {
                Authorization: `Bearer ${token}`,
                'role' : 'admin',
                'Content-Type': 'application/json'
            },
            // httpsAgent: new https.Agent({
            //     rejectUnauthorized: false,
            //     requestCert: false,
            //     secureOptions: require('constants').SSL_OP_NO_TLSv1_2
            // }),
            // proxy: false,
            // validateStatus: function (status) {
            //     return status >= 200 && status < 500; // Accept all status codes less than 500
            // }
        })
    } catch (error) {
        console.error('Error getting token:', error);
        throw error
    }
};

export const getAxiosInstance = async () => {
    return await createAuthInstance()
};