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

  Array.from(document.getElementsByClassName("card") as HTMLCollectionOf<HTMLElement>).forEach((card) => {

    const element = card as HTMLElement;
    if (element !== selectedCard) {
      element.style.zIndex = `${selectedCard.style.zIndex - 1}`
    }
  })
}

export const bodyParser = (value: string) => {
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export enum FormFieldTypes {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PHONE_INPUT = "phoneInput"
}

export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/