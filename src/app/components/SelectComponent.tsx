"use client"
import Link from 'next/link'
import { useRouter } from "next/navigation";
import '../styles/select.css'

async function deleteSet(setID: string, router) {
    const formData = new FormData();
      formData.append('setID', setID)
      try {
          const response = await fetch('http://localhost:3000/api/delete-set', {
              method: 'POST',
              body: formData,
          });
  
          if (!response.ok) {
              const txt = await response.text()
              alert(txt);
              return;
          }

          router.replace("/")
  
      } catch (error) {
          console.error('Error deleting set flashcard:', error);
      }}
  
      
export default function SelectComponent({id}: {id: number}) {
  const router = useRouter()

    return (<div className='center'>
        <div>
          <Link href={`/flashcards/${id}`}>Flashcards</Link>
        </div>
        <div className='divider'></div>
        <div>
          <Link href={`/frq/${id}`}>Free Response</Link>
        </div>
        <div className='divider'></div>
        <div>
          <button onClick={() => {deleteSet(id.toString(),router)}}>Delete This Set</button>
        </div>
      </div>
  )
}