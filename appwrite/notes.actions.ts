"use server"
import { revalidatePath } from "next/cache"
import { databases } from "./config"
import { ID } from "appwrite"
import { NoteCardProps } from "@/components/ui/NoteCard"
import { Query } from "node-appwrite"

const { NEXT_NOTES_DATABASE_ID, NEXT_NOTES_COLLECTION_ID } = process.env

export const getNotes = async (userId: string) => {
    try {
        const response = await databases.listDocuments(
            NEXT_NOTES_DATABASE_ID!,
            NEXT_NOTES_COLLECTION_ID!,
            [Query.equal("users", userId)]
        )
        return response.documents
    } catch (error) {
        console.log(error)
    }
}



type createNotesProps = Omit<NoteCardProps, "$id" | "body">

export const createNotes = async (payload: createNotesProps, userId: string) => {
    try {
        const response = await databases.createDocument(
            NEXT_NOTES_DATABASE_ID!,
            NEXT_NOTES_COLLECTION_ID!,
            ID.unique(),
            {
                ...payload,
                users: userId
            }
        )

        return response
    } catch (error) {
        console.log(error)
    }
}

export const updateNotes = async (noteId: string, payload: any) => {
    try {
        const updatedData = await databases.updateDocument(
            NEXT_NOTES_DATABASE_ID!,
            NEXT_NOTES_COLLECTION_ID!,
            noteId,
            payload
        )
        revalidatePath("/")
    } catch (error) {
        console.log(error)
    }
}

export const deleteNotes = async (noteId: string) => {
    try {
        await databases.deleteDocument(
            NEXT_NOTES_DATABASE_ID!,
            NEXT_NOTES_COLLECTION_ID!,
            noteId
        )
        revalidatePath("/")
    } catch (error) {
        console.log(error)
    }
}   