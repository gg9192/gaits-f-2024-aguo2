import { cardExistsBoolean } from '@/app/util/flashcardutils';
import { nullOrEmpty } from '@/app/util/formutils';
import { deleteCard } from '@/app/util/flashcardutils';

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
