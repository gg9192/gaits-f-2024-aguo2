import { FlashcardSets } from '@/types/Flashcardset'
import { redirect } from 'next/navigation'
import getClient from "../util/dbutil"
import Link from 'next/link'

async function getFlashCardSets(): Promise<FlashcardSets> {
    const client = getClient()
    try {
        await client.connect()
        const pgres = (await client.query("select SetName, pk from FlashcardSets order by CreatedAt DESC")).rows
        const res: FlashcardSets = pgres.map((pgrow) => {
            return { name: pgrow['setname'], id: pgrow['pk'] }
        })
        return res
    }
    catch (err) {
        console.log('error fetching flashcard sets from db', err.message)
        redirect('/500')
    }
    finally {
        client.end()
    }
}

export default async function FlashcardSetList() {

    const flashcardsets = await getFlashCardSets()

    return (<div className="flashcardBox">
        {
            flashcardsets.length === 0 ?
                (<h1>You have no study sets. Create one below!</h1>)
                :
                (
                    flashcardsets.map((el) => {
                        return (
                            <Link className='maxwidth' href={`/flashcards/${el.id}`} key={el.id}>{el.name}</Link>
                        )
                    })
                )

        }

    </div>)

}