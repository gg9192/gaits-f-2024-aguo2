"use client"
import { Flashcard } from "@/types/flashcard";
import { useState } from "react";

export default function FlashcardComponent({ flashcard }: { flashcard: Flashcard }) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
        console.log('clclclcl')
        setIsFlipped((val) => (!val))
    }

    return (
        <div>
            <div className="flip-card">
                <div className="flip-card-inner">
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