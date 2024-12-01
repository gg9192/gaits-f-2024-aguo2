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
                        {flashcard.question}
                    </div>
                    <div className="flip-card-back">
                        {flashcard.answer}
                    </div>
                </div>
            </div>
        </div>)
}