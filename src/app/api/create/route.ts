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
    console.log(`${file} dd`)
    console.log(`${text} cc`)
    if ((file === null && text === null) || (file !== null && text !== null) ) {
        return new Response('Please upload either text or PDF', {
            status: 400
          })
    }

    let textForOAI;
    
    if (file !== null) {
        const t = await fetch('http://localhost:4000/get-text')
        if (!t.ok) {
            
        }
    }
    else {
        textForOAI = text
    }

    return new Response(textForOAI, {
        status: 200
      })

}
