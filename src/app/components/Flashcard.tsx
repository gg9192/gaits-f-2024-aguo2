"use client"
import { Flashcard } from "@/types/flashcard";
import { useState } from "react";

export default function FlashcardComponent({ flashcard }: { flashcard: Flashcard }) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
        console.log('clclclcl')
        setIsFlipped((val) => (!val))
    }

    const css = isFlipped? "on-flip-inner" : ""

    return (
        <div>
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