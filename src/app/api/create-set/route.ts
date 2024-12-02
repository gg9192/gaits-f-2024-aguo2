import { nullOrEmpty } from "@/app/util/formutils";

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

    const file = formData.get('file');
    const text = formData.get('text');

    // console.log(file !== null, !nullOrEmpty(text))
    if ((file === null && nullOrEmpty(text)) || (file !== null && !nullOrEmpty(text))) {
        return new Response('Please upload either text or PDF', {
            status: 400
        })
    }

    let textForOAI;

    if (file !== null) {
        try {
            const t = await fetch('http://localhost:4000/get-text')
            if (!t.ok) {
                throw Error(`call to pdf service failed with status code: ${t.status}`, )
            }
        }
        catch (err) {
            console.log('call to pdf service failed', err.message)
            return new Response('Sorry, something went wrong', {
                status: 500
            })
        }
    }
    else {
        textForOAI = text
    }

    return new Response(textForOAI, {
        status: 200
    })

}
