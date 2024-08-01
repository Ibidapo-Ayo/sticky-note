import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis, Loader, Trash } from 'lucide-react'

type NoteActionButtonProps = {
    handleDeleteNotes: () => void,
    isDeleting?: boolean,
}

const NoteActionButton = ({ handleDeleteNotes, isDeleting }: NoteActionButtonProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-none outline-none z-[1000] flex justify-center items-center'>
                <DropdownMenuLabel
                    onClick={() => {
                        handleDeleteNotes()
                    }}
                    className='cursor-pointer'
                >
                    {isDeleting ? (
                        <Loader className='animate-spin w-5' />
                    ) : (
                     <div className='flex items-center justify-between '>
                        <Trash className='text-red-500 w-5' />
                        <span>Delete Note</span>
                     </div>
                    )}

                </DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default NoteActionButton