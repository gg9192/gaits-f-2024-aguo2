import { flashcardSets } from "@/types/flashcardset"

export default function FlashcardSetList(props: flashcardSets ) {
    return (<div className="flashcardBox">
        {props.map((el) => {return (
            <div className="flashcardSet" key={el.id}>{el.name}</div>
        )})}
    </div>)

}