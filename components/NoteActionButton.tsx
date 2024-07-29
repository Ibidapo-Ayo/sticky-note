import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react'

type NoteActionButtonProps = {
    handleDeleteNotes: () => void
}

const NoteActionButton = ({ handleDeleteNotes }: NoteActionButtonProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-none outline-none z-[1000]'>
                <DropdownMenuLabel
                    onClick={() => handleDeleteNotes()}
                    className='cursor-pointer'
                >Delete Note</DropdownMenuLabel>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}

export default NoteActionButton