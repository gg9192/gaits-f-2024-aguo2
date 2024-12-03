"use client"
import { Flashcard } from '@/types/Flashcard';
import '../styles/frq.css'
import { useState } from 'react';

async function submit(question:string, usrAnswer:string, realAnswer:string) {
    const formData = new FormData();
    formData.append('question', question);
    formData.append('usranswer', usrAnswer);
    formData.append('realanswer', realAnswer);
    const response = await fetch('http://localhost:3000/api/frq', {
      method: 'POST'  ,
      body: formData});
    const t = await response.text()
    alert(t)
  }

export default function FrqComponent({flashcard}: {flashcard: Flashcard}) {
    const [answer, setAnswer] = useState('')

    return (<>
        <h1>{flashcard?.question}</h1>
        <div className='center'>
          <h2>Enter Your Answer Here:</h2>
          <textarea
            onChange={(e) => setAnswer(e.target.value)} 
          ></textarea>
        </div>
        <button
            onClick={() => {
                submit(flashcard?.question, answer, flashcard?.answer)
            }}
        >Submit your answer</button>
      </>)

}