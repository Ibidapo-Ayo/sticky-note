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
    }[]
}

export const NoteContext = createContext<createContextProps>({notes: []})

const NoteProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState<NoteCardProps[]>([])

    const fetchData = async () => {
        const note:any = await getNotes()
        setNotes(note)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const refresh = ()=>{
        fetchData()
    }

    const contextData = { notes, setNotes , refresh}
    return <NoteContext.Provider
        // @ts-ignore
        value={contextData}
    >
        {loading ? <div className="w-full h-screen flex justify-center items-center">
            <Loader className="text-white animate-spin " />
        </div> : children}

    </NoteContext.Provider>
}

export default NoteProvider