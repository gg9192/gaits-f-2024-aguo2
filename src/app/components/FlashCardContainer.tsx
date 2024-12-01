"use client"
import { Flashcards } from "@/types/flashcard"
import { useState } from "react"

export default function FlashCardContainer(flashcards: Flashcards) {
    const [flashCardIndex, setFlashCardIndex] = useState(0)

    return (<div>
        <div>
            {flashcards[flashCardIndex].question}
        </div>
        <div>
            {flashcards[flashCardIndex].answer}
        </div>
    </div>)
}