import { setExistsBoolean, deleteSet } from '@/app/util/flashcardutils'
import { nullOrEmpty } from '@/app/util/formutils';

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
    
    if (nullOrEmpty(setID)) {
        return new Response("please fill out all form fields", {
            status: 400
        })
    }

    if (!setExistsBoolean(setID)) {
        return new Response(`set ${setID} does not exist`, {
            status: 404
        })
    }



    return deleteSet(setID)

}
