import getClient from "@/app/util/dbutil"
import { redirect } from 'next/navigation'
import { Flashcards } from "@/types/flashcard";
import FlashCardContainer from "@/app/components/FlashCardContainer";
import '../../styles/flashcards.css'

function isIntegerString(value: string): boolean {
  const parsed = parseInt(value, 10);
  return !isNaN(parsed) && parsed.toString() === value;
}

async function setExists(flashcardsetid: string) {
  let is404 = false;
  if (!isIntegerString(flashcardsetid)) {
    console.log("flash card set id was not a string") 
    redirect('/404')
  }
  const client = getClient()
  try {
    await client.connect()
    const rowCount = (await client.query('select PK from FlashcardSets where PK = $1', [flashcardsetid])).rowCount
    if (rowCount == 0) {
      is404 = true
    }}
  catch (err) {
    console.log('error fetching flashcards from db', err.message)
    redirect('/500')
  }
  finally { client.end() 
    if (is404) {
      redirect('/404')
    }}}

async function getFlashcardsForSet(flashcardsetid: string): Promise<Flashcards> {
  const client = getClient()
  try {
    await client.connect()
    const res: Flashcards = (await client.query('select Question,Answer,PK from FlashCards where flashcardsetfk = $1', [flashcardsetid])).rows.map(
      (row) => {
        return {id: row.pk, question: row.question, answer: row.answer}
      })
      return res
  }
  catch (err) {

  }

}

export default async function FlashcardPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const flashcardsetid = (await params).slug
  await setExists(flashcardsetid)
  const cards = await getFlashcardsForSet(flashcardsetid)
  console.log(cards)
  return (
    <div className="fullscreen">
      <FlashCardContainer flashcards={cards} ></FlashCardContainer>
    </div>
  )

}