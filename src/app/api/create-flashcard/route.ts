import getClient from '@/app/util/dbutil';
import { setExistsBoolean } from '@/app/util/flashcardvalidator'
import { nullOrEmpty } from '@/app/util/formutils';


async function insert(question: string, answer: string, setID: number) {
    const client = getClient()
    try {
        await client.connect()
        setID = parseInt(setID)
        console.log(setID)
        await client.query("insert into FlashCards (Question, Answer,FlashcardSetFK) values ($1,$2,$3)", [question, answer, setID])
        return new Response('ok', {
            status: 200
        })
    }
    catch (err) {
        console.log(`failed to insert flashcard into set ${setID}`, err.message)
        return new Response(`failed to insert flashcard into set ${setID}`, {
            status: 500
        })
    }
    finally {
        client.end()
    }
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
    const setID = formData.get('setID')
    const question = formData.get('question')
    const answer = formData.get('answer')
    if (nullOrEmpty(setID) || nullOrEmpty(question) || nullOrEmpty(answer)) {
        return new Response("please fill out all form fields", {
            status: 400
        })
    }

    if (!setExistsBoolean(setID)) {
        return new Response(`set ${setID} does not exist`, {
            status: 404
        })
    }

    return await insert(question, answer, setID)


}
