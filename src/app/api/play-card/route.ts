import { nullOrEmpty, isBool } from '@/app/util/formutils';
import { cardExistsBoolean, getBytes } from '@/app/util/flashcardutils';

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
    const isQuestion = formData.get('isQuestion')
    const cardID = formData.get('cardID')
    if (nullOrEmpty(isQuestion) || nullOrEmpty(cardID)) {
        return new Response('invalid parameters', {
            status: 400
        })
    }
    if (!isBool(isQuestion)) {        
        return new Response('isQustion must be boolean', {
            status: 400
        })
    }

    if (!(await cardExistsBoolean(cardID))) {        
        return new Response('card not found', {
            status: 404
        })
    }

    const buffer = await getBytes(cardID, isQuestion)


    return new Response(buffer?.buff, { headers: { 'content-type': 'audio/mpeg' } });
}
