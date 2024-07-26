"use client"
import { updateNotes } from '@/appwrite/notes.actions'
import { autoGrow, bodyParser, saveData, setNewOffset, setZIndex } from '@/lib/utils'
import { Trash } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
type NoteCardProps = {
    note: {
        $id: string,
        body: string,
        colors: string,
        position: string
    }
}

const NoteCard = ({ note }: NoteCardProps) => {
    const body = bodyParser(note.body)
    const colors = JSON.parse(`${note.colors}`)

    const [position, setPosition] = useState(JSON.parse(note.position))

    const textAreaRef = useRef(null)
    const cardRef = useRef(null)

    let mouseStartPos = { x: 0, y: 0 }

    useEffect(() => {
        autoGrow(textAreaRef)
    }, [])

    const mouseDown = (e: any) => {
        mouseStartPos.x = e.clientX
        mouseStartPos.y = e.clientY
        document.addEventListener("mousemove", mouseMove)
        document.addEventListener("mouseup", mouseUp)
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


    const mouseUp = async () => {
        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);

        const newPosition = setNewOffset(cardRef.current)
        saveData(note.$id, "position", newPosition)
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
            <div className={`flex justify-between items-center p-2 rounded-t-md`} style={{
                backgroundColor: colors.colorHeader
            }}
                onMouseDown={mouseDown}
                onMouseUp={mouseUp}
            >
                <Trash />
            </div>
            <div className='p-4 rounded-t-none rounded-b-md'>
                <textarea
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