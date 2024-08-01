"use client"
import { deleteNotes, updateNotes } from '@/appwrite/notes.actions'
import { NoteContext } from '@/context/NoteContext'
import { autoGrow, bodyParser, setNewOffset, setZIndex } from '@/lib/utils'
import { Trash, Loader, Plus, Menu, Ellipsis } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import AddNotes from '../AddNotes'
import NoteActionButton from '../NoteActionButton'

export type NoteCardProps = {
    note: {
        $id: string,
        body: string,
        colors: string,
        position: string
    }
}

const NoteCard = ({ note }: NoteCardProps) => {
    const { $id, body: noteBody, colors: noteColors, position: notePosition } = note
    const body = bodyParser(noteBody)
    const colors = JSON.parse(noteColors)
    const [position, setPosition] = useState(bodyParser(notePosition))
    const [isSaving, setIsSaving] = useState(false)
    const [deleting, setDeleting] = useState(false)

    // @ts-ignore
    const { setNotes } = useContext(NoteContext)

    const textAreaRef = useRef(null)
    const cardRef = useRef(null)
    const keyUpTimer = useRef(null)

    let mouseStartPos = { x: 0, y: 0 }

    useEffect(() => {
        autoGrow(textAreaRef)
        setZIndex(cardRef.current)
    }, [])

    const mouseDown = (e: any) => {
        if (e.target.className === "card-header") {
            setZIndex(cardRef.current);
            mouseStartPos.x = e.clientX
            mouseStartPos.y = e.clientY
            document.addEventListener("mousemove", mouseMove)
            document.addEventListener("mouseup", mouseUp)
        }
    }

    const mouseMove = (e: any) => {

        const mouseMoveDir = {
            x: mouseStartPos.x - e.clientX,
            y: mouseStartPos.y - e.clientY
        }

        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY

        const newPosition = setNewOffset(cardRef.current, mouseMoveDir)

        if (cardRef.current) {
            setPosition(newPosition)
            setZIndex(cardRef.current)
        }

    }


    const mouseUp = () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOffset(cardRef.current)
        saveData($id, "position", newPosition)
    }

    const saveData = async (id: string, key: any, value: any) => {
        const payload = { [key]: JSON.stringify(value) }
        await updateNotes(id, payload)
        setIsSaving(false)
    }

    const handleKeyUp = () => {
        setIsSaving(true)

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current)
        }

        // @ts-ignore
        keyUpTimer.current = setTimeout(() => {
            // @ts-ignore
            saveData($id, "body", textAreaRef.current?.value)
        }, 2000)
    }

    const handleDeleteNotes = async () => {
        setDeleting(true)
        await deleteNotes($id)
        setNotes((prev: any) => prev.filter((n: any) => $id !== n.$id))
        setDeleting(false)
    }

    return (
        <div className='w-[600px] rounded-md absolute cursor-pointer shadow-md card'
            style={{
                backgroundColor: colors.colorBody,
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
            ref={cardRef}
        >
            <div className={`card-header`} style={{
                backgroundColor: colors.colorHeader
            }}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
            >
                <AddNotes />
                <div className='flex space-x-2'>
                    {isSaving && (
                        <div className='flex space-x-2 items-center'>
                            <Loader className='animate-spin w-3' />
                            <span className='text-xs'>Saving...</span>
                        </div>
                    )}
                    <NoteActionButton handleDeleteNotes={handleDeleteNotes} isDeleting={deleting} />
                </div>
            </div>
            <div className='p-4 rounded-t-none rounded-b-md'>
                <textarea
                    onKeyUp={handleKeyUp}
                    ref={textAreaRef}
                    className={`text-${colors.colorText} bg-inherit border-none w-full h-full resize-none text-[16px] focus:border-none focus:outline-none`}
                    defaultValue={body}
                    onInput={() => autoGrow(textAreaRef)}
                    onFocus={() => setZIndex(cardRef.current)}
                />
            </div>
        </div>
    )
}

export default NoteCard