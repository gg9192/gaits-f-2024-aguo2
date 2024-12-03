"use client"
import { useState } from "react"
import '../styles/flashcards.css'
import FlashcardComponent from "./Flashcard"
import { Flashcards } from "@/types/Flashcard"
import { useEffect } from "react"
import { debounce } from "lodash";

async function deleteCard(id: number) {
    const formData = new FormData();
    formData.append('cardID', id.toString())
    try {
        const response = await fetch('http://localhost:3000/api/delete-flashcard', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const txt = await response.text()
            alert(txt);
            return;
        }

        window.location.reload();

    } catch (error) {
        console.error('Error creating flashcard:', error);
    }}

export default function FlashCardContainer({ flashcards }: { flashcards: Flashcards }) {
    const [flashCardIndex, setFlashCardIndex] = useState(0)
    const [width, setWidth] = useState(window.innerWidth);

    const getFlashcardID = () => (flashcards[flashCardIndex].id)

    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        const debouncedUpdateDimensions = debounce(updateDimensions, 200); // 200ms delay
        window.addEventListener("resize", debouncedUpdateDimensions);
        return () => {
            window.removeEventListener("resize", debouncedUpdateDimensions);
        };
    }, []);

    const getOffset = () => {
        return -1 * (flashCardIndex * (0.4 * width) + (0.15 * width) * flashCardIndex)
    }

    const handleRightClick = () => {
        setFlashCardIndex((og: number): number => {
            if (og !== flashcards.length - 1) {
                return og + 1
            }
            return og
        })
    }

    const handleLeftClick = () => {
        setFlashCardIndex((og: number): number => {
            if (og !== 0) {
                return og - 1
            }
            return og
        })
    }

    const leftButtonDisabled = flashCardIndex === 0
    const rightButtonDisabled = flashCardIndex === flashcards.length - 1
    const leftbuttonStyle = leftButtonDisabled ? "button-disabled" : "control-button"
    const rightButtonStyle = rightButtonDisabled ? "button-disabled" : "control-button"


    return (<div className="outer-outer"><div className="outer-container">
        <div key={-1} className="cards-container">
            {flashcards.map((flashcard, i) =>
                <div key={i} className="cards-wrapper" style={{ transform: `translate(${getOffset()}px, 0px)` }}><FlashcardComponent flashcard={flashcard}></FlashcardComponent></div>
            )}
        </div>
        <div key={-10} className="cards-controls">
            <button className={leftbuttonStyle} onClick={handleLeftClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10.605" height="15.555" fill="#000000"><path d="M10.605 12.727 5.656 7.776l4.949-4.948L7.777 0 0 7.776l7.777 7.779 2.828-2.828z" /></svg>
            </button> {/* left */}
            <button className="control-button" onClick={() => {
                const cardID = getFlashcardID()
                deleteCard(cardID)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className="svg-icon">
                    <path d="M 10 2 L 9 3 L 5 3 C 4.4 3 4 3.4 4 4 C 4 4.6 4.4 5 5 5 L 7 5 L 17 5 L 19 5 C 19.6 5 20 4.6 20 4 C 20 3.4 19.6 3 19 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 20 C 5 21.1 5.9 22 7 22 L 17 22 C 18.1 22 19 21.1 19 20 L 19 7 L 5 7 z M 9 9 C 9.6 9 10 9.4 10 10 L 10 19 C 10 19.6 9.6 20 9 20 C 8.4 20 8 19.6 8 19 L 8 10 C 8 9.4 8.4 9 9 9 z M 15 9 C 15.6 9 16 9.4 16 10 L 16 19 C 16 19.6 15.6 20 15 20 C 14.4 20 14 19.6 14 19 L 14 10 C 14 9.4 14.4 9 15 9 z"></path>
                </svg>
            </button> {/* trash */}
            <button className="control-button">
                <svg fill="#000000" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" className="svg-icon"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M157.27246,21.21973a11.99809,11.99809,0,0,0-12.63965,1.30761L75.88281,76H32A20.02229,20.02229,0,0,0,12,96v64a20.02229,20.02229,0,0,0,20,20H75.88281l68.75,53.47266A11.99983,11.99983,0,0,0,164,224V32A12.0007,12.0007,0,0,0,157.27246,21.21973ZM140,199.46484l-52.63281-40.9375A12.00231,12.00231,0,0,0,80,156H36V100H80a12.00231,12.00231,0,0,0,7.36719-2.52734L140,56.53516ZM203.98828,104v48a12,12,0,0,1-24,0V104a12,12,0,0,1,24,0Zm36-16v80a12,12,0,0,1-24,0V88a12,12,0,0,1,24,0Z"></path> </g></svg>
            </button> {/* speaker */}
            <button className={rightButtonStyle} onClick={handleRightClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10.605" height="15.555" fill="#000000" className="right-button"><path d="M10.605 12.727 5.656 7.776l4.949-4.948L7.777 0 0 7.776l7.777 7.779 2.828-2.828z" /></svg>
            </button> {/* right */}
        </div>
    </div>
    </div>)
}