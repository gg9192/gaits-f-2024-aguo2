import styles from "./page.module.css";
import FlashcardSetList from "./components/FlashcardSetList";

export default function Home() {
  return (
    <div className={styles.page}>
        <div>Select a Flashcard Set</div>
        <FlashcardSetList></FlashcardSetList>
        <div className={styles.ctas}>Create A New Set</div>
    </div>
  );
}
