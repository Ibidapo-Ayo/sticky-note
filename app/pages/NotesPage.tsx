import { getNotes } from '@/appwrite/notes.actions'
import NoteCard from '@/components/ui/NoteCard'
// import { fakeData as notes } from '@/public/assets/fakeData'
import React from 'react'

const NotesPage = async() => {
  const notes = await getNotes()
  return (
    notes!.map((note) => (
      // @ts-ignore
      <NoteCard key={note.$id} note={note} />
    ))
  )
}

export default NotesPage