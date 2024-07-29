
import React, { useContext, useRef } from 'react'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import colors from "../public/assets/colors.json"
import { createNotes } from '@/appwrite/notes.actions'
import { NoteContext } from '@/context/NoteContext'

const AddNotes = () => {
  // @ts-ignore
  const { setNotes } = useContext(NoteContext)
  const startingPos = useRef(10)
  const addNote = async () => {
    const payload = {
      position: JSON.stringify({
        x: startingPos.current,
        y: startingPos.current
      }),
      colors: JSON.stringify(colors[0])
    }
    startingPos.current += 10
    const response = await createNotes(payload)

    setNotes((prev: any) => [...prev, response])

  }
  return (
    <Button variant={"ghost"} size={"icon"} className='hover:bg-transparent' onClick={addNote}>
      <Plus />
    </Button>
  )
}

export default AddNotes