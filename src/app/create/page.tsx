import '../styles/create.css'
import FileUpload from '../components/FileUploader'

export default function Page() {
    
    return (<>

        <h1>Upload Your PDF</h1>
        <FileUpload></FileUpload>
        <h1>OR</h1>
        <h1>Paste Your Notes Here</h1>
        <textarea className="scrollabletextbox">
        </textarea>
        <h3>Warning: AI can make mistakes, be sure to check the response!</h3>
        <button>Create a New Set</button>
    </>)
}