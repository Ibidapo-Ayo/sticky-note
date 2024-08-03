"use client"
import { getNotes } from "@/appwrite/notes.actions"
import { NoteCardProps } from "@/components/ui/NoteCard"
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react"

type createContextProps = {
    notes: NoteCardProps[],
    setUserId?: Dispatch<SetStateAction<string>>,
    userId: string,
    loading?: boolean,
    setNotes?: Dispatch<SetStateAction<NoteCardProps[]>>,
    refresh?: ()=> void,

}

export const NoteContext = createContext<createContextProps>({
    notes: [],
    userId: ""
})

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState<NoteCardProps[]>([])
    const [userId, setUserId] = useState<string>("");

    const fetchData = async (userId?: string) => {
        const note: any = await getNotes(userId!)
        setNotes(note)
        setLoading(false)
    }

    useEffect(() => {
        if (userId) {
            fetchData(userId)
        }
    }, [userId])


    const refresh = () => {
        fetchData()
    }

    const contextData = { notes, setNotes, refresh, setUserId, userId, loading }
    return <NoteContext.Provider
        value={contextData}
    >
        {children}

    </NoteContext.Provider>
}

export default NoteProvider