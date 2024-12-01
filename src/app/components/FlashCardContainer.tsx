"use client"
import { Flashcards } from "@/types/flashcard"
import { useState } from "react"
import '../styles/flashcards.css'
import FlashcardComponent from "./Flashcard"

export default function FlashCardContainer({flashcards}:{flashcards: Flashcards}) {
    const [flashCardIndex, setFlashCardIndex] = useState(0)
    return (<div>
       <FlashcardComponent flashcard={flashcards[flashCardIndex]}></FlashcardComponent>
    </div>)
}