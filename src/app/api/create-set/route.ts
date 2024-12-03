import { nullOrEmpty } from "@/app/util/formutils";
import getClient, { dateToTimeStamp } from "@/app/util/dbutil";
import { getFlashcardSets } from "../../util/openaiutils"

async function createSet(setName: string): Promise<number | null> {
    const client = getClient()
    try {
        await client.connect()
        const datestr = dateToTimeStamp(new Date())
        const res = (await client.query("INSERT INTO FlashcardSets (CreatedAt, SetName) VALUES ($1, $2) RETURNING pk", [datestr, setName])).rows[0].pk
        return res
    }
    catch (err) {
        console.log(`error creating set`, err.message)
        return null;
    }
    finally { client.end() }
}


export async function POST(request: Request) {
    let formData;
    try {
        formData = await request.formData();
    }
    catch {
        return new Response('Please send valid form data', {
            status: 400
        })
    }

    const text = formData.get('text');
    const name = formData.get('name');
    if (nullOrEmpty(text) || nullOrEmpty(name)) {
        return new Response('please fill out all fields', {
            status: 400
        })
    }

    const newSetId = await createSet(name)
    if (newSetId === null) {
        return new Response('failed to create set', {
            status: 500
        })
    }
    console.log('calling to oai')
    const aiResponse = await getFlashcardSets(text)
    console.log(aiResponse)
    const client = getClient()

    try {
        await client.connect()
        let cnt = 0
        for (const card of aiResponse) {
            console.log(`inserting card ${cnt}`)
            cnt ++;
            const question = card.q
            const answer = card.a
            await client.query("insert into FlashCards (Question, Answer,FlashcardSetFK) values ($1,$2,$3)", [question, answer, newSetId]);
        }
    }
    catch (err) {
        console.log('error inserting card into db', err.message)
    }
    finally {
        client.end()
    }
    




    return new Response('ok', {
        status: 200
    })

}
