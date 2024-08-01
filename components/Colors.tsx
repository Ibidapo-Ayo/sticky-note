import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import colors from "@/public/assets/colors.json"

const Colors = ({ color, setNoteColor }: {
    color: any,
    setNoteColor: (color: any) => void,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='w-8 h-8 rounded-full' style={{
                    backgroundColor: color.colorHeader
                }}></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='z-[1000] grid grid-cols-4 gap-2' >
                {colors.map((color, index) => (
                    <DropdownMenuLabel
                        className='cursor-pointer w-8 h-8'
                        style={{
                            backgroundColor: color.colorHeader
                        }}
                        key={index}

                        onClick={() => {
                            setNoteColor(color)
                        }}
                    >
                    </DropdownMenuLabel>
                ))}
            </DropdownMenuContent>

        </DropdownMenu>

    )
}

export default Colors