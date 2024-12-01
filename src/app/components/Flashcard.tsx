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
    </div>
    <div className="flip-card-back">
      <h1>John Doe</h1>
      <p>Architect & Engineer</p>
      <p>We love that guy</p>
    </div>
  </div>
</div>
        </div>)
}