import styles from "./page.module.css";
import FlashcardSetList from "./components/FlashcardSetList";

export default function Home() {
  return (
    <div className={styles.page}>
        <h1>Select a Flashcard Set</h1>
        <FlashcardSetList></FlashcardSetList>
        <h1>OR:</h1>
        <a href='/create'>Create a New Set</a>
    </div>
  );
}
