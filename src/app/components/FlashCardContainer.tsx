"use client"
import { useState } from "react"
import '../styles/flashcards.css'
import FlashcardComponent from "./Flashcard"

export default function FlashCardContainer({ flashcards }: { flashcards: Flashcards }) {
    const [flashCardIndex, setFlashCardIndex] = useState(0)
    return (<div className="outer-container">
        <FlashcardComponent flashcard={flashcards[flashCardIndex]}></FlashcardComponent>
        <div className="cards-controls">
            <button className="control-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="10.605" height="15.555" fill="#000000"><path d="M10.605 12.727 5.656 7.776l4.949-4.948L7.777 0 0 7.776l7.777 7.779 2.828-2.828z" /></svg>
            </button> {/* left */}
            <button className="control-button">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className="trash">
                    <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
                </svg>
            </button> {/* trash */}
            <button className="control-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="10.605" height="15.555" fill="#000000" className="right-button"><path d="M10.605 12.727 5.656 7.776l4.949-4.948L7.777 0 0 7.776l7.777 7.779 2.828-2.828z" /></svg>
            </button> {/* right */}
        </div>
    </div>)
}