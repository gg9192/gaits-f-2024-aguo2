import { flashcardSets } from "@/types/flashcardset"
import pg from 'pg'



async function getFlashCardSets() {
    const portAsString:string = process.env.DB_PORT == undefined ? '' : process.env.DB_PORT

    const { Client } = pg
    const client = new Client({
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: parseInt(portAsString),
        database: 'GAITS-project' // Connect to the new database
    })
    await client.connect()
    const pgres = (await client.query("select SetName, pk from FlashcardSets order by CreatedAt ASC")).rows
    console.log(pgres)
    const res:flashcardSets = pgres.map((pgrow) => {
        return {name: pgrow['setname'], id:pgrow['pk']}
    })
    return res
}

export default async function FlashcardSetList() {

    const flashcardsets = await getFlashCardSets()

    return (<div className="flashcardBox">
        {flashcardsets.map((el) => {return (
            <div className="flashcardSet" key={el.id}>{el.name}</div>
        )})}
    </div>)

}