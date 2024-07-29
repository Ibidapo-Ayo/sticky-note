"use server"
import { revalidatePath } from "next/cache"
import { databases } from "./config"
import { ID } from "appwrite"
import { NoteCardProps } from "@/components/ui/NoteCard"

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

type createNotesProp = Pick<NoteCardProps, "note">['note']

type createNotesProps = Omit<createNotesProp, "$id" | "body">

export const createNotes = async (payload: createNotesProps) => {
    try {
        const response = await databases.createDocument(
            NEXT_NOTES_DATABASE_ID!,
            NEXT_NOTES_COLLECTION_ID!,
            ID.unique(),
            payload
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