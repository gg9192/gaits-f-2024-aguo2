"use client"
import { Flashcard } from "@/types/Flashcard";
import { useState } from "react";

export default function FlashcardComponent({ flashcard, flipped }: { flashcard: Flashcard, flipped: Function }) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
        flipped((val:boolean) => (!val))
        setIsFlipped((val) => (!val))
    }

    const css = isFlipped? "on-flip-inner" : ""

    return (
        <div key={flashcard.id}>
            <div className="flip-card" onClick={handleClick}>
                <div className={`flip-card-inner ${css}`}>
                    <div className="flip-card-front">
                        <h1>{flashcard.question}</h1>
                    </div>
                    <div className="flip-card-back">
                        <div><h1>{flashcard.answer}  </h1></div>
                    </div>
                </div>
            </div>
        </div>)
}