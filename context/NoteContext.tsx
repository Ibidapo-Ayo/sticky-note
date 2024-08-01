"use client"
import { getNotes } from "@/appwrite/notes.actions"
import { NoteCardProps } from "@/components/ui/NoteCard"
import { Loader } from "lucide-react"
import { createContext, useEffect, useState } from "react"

type createContextProps = {
    notes: {
        $id?: string;
        body?: string;
        colors?: string;
        position?: string;
    }[],
    setUserId: (userId: string) => string,
    userId: string,
    loading?: boolean
}

export const NoteContext = createContext<createContextProps>({
    notes: [],
    setUserId: (userId: string) => "",
    userId: ""
})

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState<NoteCardProps[]>([])
    const [userId, setUserId] = useState<string | null>("");

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