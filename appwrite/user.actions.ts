'use server'
import { ID } from "appwrite"
import {  databases, account } from "./config"
import { Query } from "node-appwrite"
const { NEXT_NOTES_DATABASE_ID, NEXT_USERS_COLLECTION_ID } = process.env

export const registerUser = async (user: {
    username: string,
    email: string,
    password: string
}) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username
        )

        const newUser = await databases.createDocument(
            NEXT_NOTES_DATABASE_ID!,
            NEXT_USERS_COLLECTION_ID!,
            ID.unique(),
            {
                username: user.username,
                email: user.email,
                accountId: newAccount.$id
            }
        )
        return newUser
    } catch (error) {
        // @ts-ignore
        if (error && error?.code === 409) {
            const documents = databases.listDocuments(
                NEXT_NOTES_DATABASE_ID!,
                NEXT_USERS_COLLECTION_ID!,
                [Query.equal("email", user.email)]
            )

            return documents

        }
        console.log(error)
    }
}