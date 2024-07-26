"use server"
import { revalidatePath } from "next/cache"
import { databases } from "./config"

const { NEXT_NOTES_DATABASE_ID, NEXT_NOTES_COLLECTION_ID } = process.env

export const getNotes = async () => {
    try {
        const response = await databases.listDocuments(
            NEXT_NOTES_DATABASE_ID!,
            NEXT_NOTES_COLLECTION_ID!
        )
        return response.documents
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