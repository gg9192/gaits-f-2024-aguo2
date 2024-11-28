export default function FlashcardSetList() {
    const a = [1,1,1,1,1,1,1,]
    return (<div className="flashcardBox">
        {a.map((el,i) => {return (
            <div className="flashcardSet" key={i}>aaa</div>
        )})}
    </div>)

}