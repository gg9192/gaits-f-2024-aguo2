"use client"
import '../styles/create.css'
import { useState } from 'react'
import { redirect } from 'next/navigation'

async function submitForm(notes: string, name: string){
    const formData = new FormData();
    formData.append('name', name);
    formData.append('text', notes);

    const res = await fetch('http://localhost:3000/api/create-set', {
        method: 'POST'  ,
        body: formData});
    if (!res.ok) {
        const text = await res.text()
        alert(text)
        return
    }
    redirect("/")
}

export default function Page() {
    const [name, setName] = useState('')
    const [notes, setNotes] = useState('')
    return (<>
        <h1>Name this set</h1>
        <input
            onChange={(e) => setName(e.target.value)}
        ></input>
        <h1>Paste Your Notes Here</h1>
        <textarea 
            className="scrollabletextbox"
            onChange={(e) => setNotes(e.target.value)}
            >
        </textarea>
        <h3>Warning: AI can make mistakes, be sure to check the response!</h3>
        <button onClick={() => {
            submitForm(notes, name)
        }}>Create a New Set</button>
    </>)
}