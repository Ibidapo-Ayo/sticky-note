"use client"
import NoteCard from '@/components/ui/NoteCard'
import { NoteContext } from '@/context/NoteContext'
import React, { useContext } from 'react'

const NotesPage = () => {
    const {notes} = useContext(NoteContext)
  return (
    notes!.map((note) => (
      // @ts-ignore
      <NoteCard key={note.$id} note={note} />
    ))
  )
}

export default NotesPage