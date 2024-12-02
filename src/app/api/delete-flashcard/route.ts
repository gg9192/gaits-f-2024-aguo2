import getClient from '@/app/util/dbutil';
import { cardExistsBoolean } from '@/app/util/flashcardvalidator';
import { nullOrEmpty } from '@/app/util/formutils';

async function deleteCard(id) {
    const client = getClient()
    id = parseInt(id)
    try {
        await client.connect()
        await client.query('DELETE FROM FlashCards WHERE pk = $1', [id])
        return new Response(`ok`, {
            status: 200
        })
    }
    catch (err) {
        console.log(`error deleting flashcard ${id}`, err.message)
        return new Response(`error deleting flashcard ${id}`, {
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

    const cardId = formData.get('cardID')
    if (nullOrEmpty(cardId)) {
        return new Response(`please input a valid card id`, {
            status: 400
        })
    }

    if (!cardExistsBoolean(cardId)) {
        return new Response(`card ${cardId} does not exist`, {
            status: 404
        })
    }

    return await deleteCard(cardId)
}
