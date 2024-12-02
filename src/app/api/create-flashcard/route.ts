import pg from 'pg'
import setExists from '@/app/util/flashcardvalidator'

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
    const flashcardset = form.flashcardset


    return new Response('ok', {
        status: 200
      })

}
