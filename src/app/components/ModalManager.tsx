"use client"
import '../styles/modal.css'
import { useState } from 'react'




export default function ModalManager() {
    const [isOpen, setIsOpen] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    console.log(question, answer)

    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    return (<>
        <button className="button" onClick={handleOpen}><h1>Add a Card</h1></button>
        <div className="modal" style={{ display: isOpen ? 'flex' : 'none' }}>
            <h1>Add a Flashcard</h1>
            <div className='top-right' onClick={handleClose}><svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                width="24"
                height="24"
                className='x'
            >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg></div>
            <h3 className='top-gap'>Question:</h3>
            <textarea onChange={(e) => setQuestion(e.target.value)}></textarea>
            <h3 className='top-gap'>Answer:</h3>
            <textarea onChange={(e) => setAnswer(e.target.value)}></textarea>
            <button className='button'>Create!</button>
        </div>
    </>)
}