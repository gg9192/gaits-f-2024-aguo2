import getClient from "@/app/util/dbutil"
import { Flashcards } from "@/types/Flashcard";
import FlashCardContainer from "@/app/components/FlashCardContainer";
import setExists from "../../util/flashcardvalidator"
import ModalManager from "@/app/components/ModalManager";
import { redirect } from 'next/navigation'
import '../../styles/flashcards.css'

async function getFlashcardsForSet(flashcardsetid: string): Promise<Flashcards> {
  const client = getClient()
  try {
    await client.connect()
    const res: Flashcards = (await client.query('select Question,Answer,PK from FlashCards where flashcardsetfk = $1', [flashcardsetid])).rows.map(
      (row) => {
        return { id: row.pk, question: row.question, answer: row.answer }
      })
    return res
  }
  catch (err) {
    console.log(`error fetching flashcardsfrom postgres for set ${flashcardsetid}`, err.message)
    redirect('/500')
  }
  finally {
    client.end()
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
      <ModalManager></ModalManager>
    </div>
  )

}