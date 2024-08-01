'use server'
import { ID } from "appwrite"
import { databases, account } from "./config"
import { Query } from "node-appwrite"
import { createNotes, getNotes } from "./notes.actions"
import colors from "../public/assets/colors.json"
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

        await getAddNotes(newUser.$id)

        return newUser
    } catch (error) {
        // @ts-ignore
        if (error && error?.code === 409) {
            const documents = await databases.listDocuments(
                NEXT_NOTES_DATABASE_ID!,
                NEXT_USERS_COLLECTION_ID!,
                [Query.equal("email", user.email)]
            )
            
            await getAddNotes(documents?.documents[0].$id)
            return documents?.documents[0]
        }
        console.log(error)
    }
}

export const getAddNotes = async (userId: string) => {
    const userNotes = await getNotes(userId)
    if (userNotes?.length === 0) {
        try {
            const payload = {
                position: JSON.stringify({
                    x: 10,
                    y: 10
                }),
                colors: JSON.stringify(colors[0])
            }
            await createNotes(payload, userId)
        } catch (error) {
            console.log(error)
        }
    }
}