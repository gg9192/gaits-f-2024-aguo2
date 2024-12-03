import { setExists } from '../../util/flashcardvalidator'
import getClient from '@/app/util/dbutil'
import { Flashcard } from '@/types/Flashcard'
import '../../styles/frq.css'

async function getRandomCard(flashcardsetid: number): Promise<Flashcard | null> {
  const client = getClient()
  try {
    await client.connect()
    const rows = (await client.query("SELECT * FROM FlashCards WHERE FlashcardSetFK= $1 ORDER BY RANDOM() LIMIT 1;", [flashcardsetid])).rows
    const res = rows.map((row) => ({ id: row.pk, question: row.question, answer: row.answer }))
    return res[0]

  }
  catch (err) {
    console.log(`error while selecting a random question`, err.message)
    return null
  }
  finally {
    client.end()
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const flashcardsetid = (await params).slug
  await setExists(flashcardsetid)
  const flashcard = await getRandomCard(parseInt(flashcardsetid))
  console.log(flashcard, 'caca')

  return (<>
    <h1>{flashcard?.question}</h1>
    <div className='center'>
      <h2>Enter Your Answer Here:</h2>
      <textarea></textarea>
    </div>
    <button>Submit your answer</button>
  </>)
}