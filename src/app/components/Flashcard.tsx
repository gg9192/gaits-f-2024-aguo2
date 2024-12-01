"use client"
import { Flashcard } from "@/types/flashcard";
import { useState } from "react";

export default function FlashcardComponent({ flashcard }: { flashcard: Flashcard }) {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
        console.log('clclclcl')
        setIsFlipped((val) => (!val))
    }

    return (<div onClick={handleClick} className="flashcard">
        {isFlipped ? (<h1>
            {flashcard.answer}
        </h1>) : (<h1>
            {flashcard.question}
        </h1>)}
    </div>)
}