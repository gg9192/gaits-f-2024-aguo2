import pg from 'pg'

async function setExists() {

}

export default async function FlashcardPage({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {  
    const flashcardsetid = (await params).slug


}