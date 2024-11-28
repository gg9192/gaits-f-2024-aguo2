import styles from "./page.module.css";
import FlashcardSetList from "./components/FlashcardSetList";

export default function Home() {
  return (
    <div className={styles.page}>
        <div>Select a Flashcard Set</div>
        <FlashcardSetList></FlashcardSetList>
        <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy now
          </a>
    </div>
  );
}
