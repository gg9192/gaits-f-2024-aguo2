export default function FileNameDisplayer(ref) {
    console.log(ref)
    const displayString = ref.ref === undefined ? "You have not selected a file to upload" : `${ref.ref}`
    return (<h4 className="hiiii">{displayString}</h4>)
}