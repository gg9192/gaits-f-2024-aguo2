import { flashcardSets } from "@/types/flashcardset"
import { redirect } from 'next/navigation'
import getClient from "../util/dbutil"


async function getFlashCardSets() {
    const client = getClient()
    try {
        await client.connect()
        const pgres = (await client.query("select SetName, pk from FlashcardSets order by CreatedAt DESC")).rows
        const res: flashcardSets = pgres.map((pgrow) => {
            return { name: pgrow['setname'], id: pgrow['pk'] }
        })
        return res
    }
    catch (err) { 
        redirect('/500')
    }
    finally {
        client.end()
     }
}

export default async function FlashcardSetList() {

    const flashcardsets = await getFlashCardSets()

    return (<div className="flashcardBox">
        {flashcardsets.map((el) => {
            return (
                <a className="maxwidth" key={el.id}>{el.name}</a>
            )
        })}
    </div>)

}