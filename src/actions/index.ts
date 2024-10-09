/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn, signOut } from "@/auth"
import { loginService } from "@/service/admin-service"
import { cookies } from "next/headers"

export const loginAction = async (payload: any) => {
    try {
        const res: any = await loginService(payload)
        if (res.data.success) {
            await signIn('credentials', {
                email: payload.email,
                password: payload.password,
                name: res.data.data.firstName + ' ' + res.data.data.lastName,
                _id: res.data.data._id,
                redirect: false,
            },
            )
        }
        return res.data
    } catch (error: any) {
        return error.response.data
    }
}




export const logoutAction = async () => {
    try {
        await signOut()
    } catch (error: any) {
        return error.response.data
    }
}

export const getTokenCustom = async () => {
    const cookiesOfNextAuth = cookies().get("authjs.session-token")
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    return cookiesOfNextAuth?.value!
}