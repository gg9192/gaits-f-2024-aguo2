"use client"
import '../styles/create.css'
import FileUpload from '../components/FileUploader'
import { useState } from 'react'

export default function Page() {
    const [name, setName] = useState()
    
    return (<>
        <h1>Name this set</h1>
        <input
            onChange={(e) => setName(e.target.value)}
        ></input>
        <h1>Paste Your Notes Here</h1>
        <textarea className="scrollabletextbox">
        </textarea>
        <h3>Warning: AI can make mistakes, be sure to check the response!</h3>
        <button>Create a New Set</button>
    </>)
}