from flask import Flask, request
from pypdf import PdfReader


app = Flask(__name__)

@app.route("/get-text", methods = ['POST'])
def about():
    if 'file' not in request.files:
        return "no file attached", 400  
    file = request.files['file']
    stream = file.stream
    reader = PdfReader(stream)
    page_text = []
    for page in reader.pages:
        pt = page.extract_text()
        page_text.append(pt)
    print(page_text)
    return page_text


if __name__ == "__main__":
    app.run(debug=True, port='4000')