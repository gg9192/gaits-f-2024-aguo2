import { nullOrEmpty } from '@/app/util/formutils';
import { evalFRQ } from '@/app/util/openaiutils';

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

    const question = formData.get('question')
    const usrAnswer = formData.get('usranswer')
    const realAnswer = formData.get('realanswer')
    if (nullOrEmpty(question) || nullOrEmpty(realAnswer)) {
        return new Response(`code has an error`, {
            status: 500
        })
    }

    if (nullOrEmpty(usrAnswer)) {
        return new Response(`please input an answer`, {
            status: 400
        })
    }
    console.log('calling to openai')
    const response = await evalFRQ(question,usrAnswer,realAnswer)


    return new Response(`${response}`, {
        status: 200
    })
}
