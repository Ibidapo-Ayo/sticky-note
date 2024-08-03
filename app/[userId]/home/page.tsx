"use client"
import NoteCard from '@/components/ui/NoteCard'
import { NoteContext } from '@/context/NoteContext'
import { Loader } from 'lucide-react'
import { useContext, useEffect } from 'react'

const Home = ({ params }: any) => {
    const { userId } = params
    const { notes, setUserId, loading } = useContext(NoteContext)

    useEffect(()=>{
        setUserId!(userId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])
    
    return (
        <div className='md:py-10 p-2 pb-2 h-screen relative overflow-hidden'>
            {loading ? <div className="w-full h-screen flex flex-col justify-center  space-y-5 items-center">
                <Loader className="text-white animate-spin " />
                <span className='text-white'>Generating your sticky notes...</span>
            </div> : (
                notes!.map((note) => (
                    <NoteCard key={note.$id} note={note} />
                ))
            )}

        </div>
    )
}

export default Home