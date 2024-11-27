import styles from "./page.module.css";
import FlashcardSetList from "./components/FlashcardSetList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>Select a Flashcard Set</div>
        <FlashcardSetList></FlashcardSetList>
      </main>

    </div>
  );
}
