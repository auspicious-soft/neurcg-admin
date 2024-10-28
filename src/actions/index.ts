/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { signIn, signOut } from "@/auth"
import { createS3Client } from "@/config/s3"
import { loginService } from "@/service/admin-service"
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const loginAction = async (payload: any) => {
    try {
        const res: any = await loginService(payload)
        if (res.data.success) {
            await signIn('credentials', {
                email: payload.email,
                id: res?.data?.data.id,
                redirect: false
            },
            )
        }
        return res.data
    } catch (error: any) {
        console.log('error: ', error);
        return error?.response?.data
    }
}


export const logoutAction = async () => {
    try {
        await signOut();
        cookies().set(process.env.JWT_SALT as string, '', { expires: new Date(0), path: '/', sameSite: 'lax', secure: true });
        redirect('/login')
    } catch (error: any) {
        return error?.response?.data;
    }
}
export const getTokenCustom = async () => {
    const cookiesOfNextAuth = cookies().get(process.env.JWT_SALT as string)
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    return cookiesOfNextAuth?.value!
}

// Upload avatar to S3 upload url
export const generateSignedUrlToUploadOn = async (fileName: string, fileType: string) => {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `avatars/${fileName}`,
        ContentType: fileType,
    }
    try {
        const command = new PutObjectCommand(uploadParams)
        const signedUrl = await getSignedUrl(await createS3Client(), command)
        return signedUrl
    } catch (error) {
        console.error("Error generating signed URL:", error);
        throw error
    }
}


// Get avatar from S3
export const generateSignedUrlToGet = async (imageKey: string) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageKey,
    }
    try {
        const command = new GetObjectCommand(params)
        const url = await getSignedUrl(await createS3Client(), command)
        return url;
    } catch (error) {
        throw error
    }
}

//Delete a file from S3
export const deleteFileFromS3 = async (imageKey: string) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageKey,
    }

    try {
        const s3Client = await createS3Client()
        const command = new DeleteObjectCommand(params)
        const response = await s3Client.send(command)
        return response
    } catch (error) {
        console.error('Error deleting file from S3:', error)
        throw error
    }
}