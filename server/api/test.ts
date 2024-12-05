import prisma from "../utils/prisma"
import {hash} from 'bcrypt'
import { RouterMethod } from "h3"

export default defineEventHandler(async(event) => {

    // const method = Method
    // if(method !== 'POST') {
    //     throw createError({
    //         statusCode: 405,
    //         statusMessage: 'Method Not Allowed'
    //     })
    // }

    const body = await readBody(event)
    const hashedPassword = await hash(body.password, 10)
    const user = await prisma.user.create({
        data: 
        {
            id_user: 2,
            nama_user: "doe",
            username: 'doe',
            password: hashedPassword,
            Role: 'OPERATOR',
            status: 'EMPLOYED',
            hp: '081234567890',
            alamat: 'St. Jalan',
        },
    })


    return user
})