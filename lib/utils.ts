import { updateNotes } from "@/appwrite/notes.actions"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const setNewOffset = (card: any, mouseMoveDir = { x: 0, y: 0 }) => {
  const offsetLeft = card.offsetLeft - mouseMoveDir.x
  const offsetTop = card.offsetTop - mouseMoveDir.y
  return {
    x: offsetLeft < 0 ? 0 : offsetLeft,
    y: offsetTop < 0 ? 0 : offsetTop
  }
}

export const autoGrow = (textarea: React.MutableRefObject<HTMLDivElement | null>) => {
  const { current } = textarea
  if (current) {
    current.style.height = "auto",
      current.style.height = current.scrollHeight + "px"
  }
}

export const setZIndex = (selectedCard: any) => {
  selectedCard.style.zIndex = 999

  // @ts-ignore
  Array.from(document.getElementsByClassName("card")).forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = selectedCard.style.zIndex - 1
    }
  })
}

export const bodyParser = (value:string)=>{
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}