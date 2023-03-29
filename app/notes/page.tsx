import Link from "next/link";
import styles from "./Notes.module.css";
import AddNote from "@/components/input/AddNote";
import { getNotes } from "../../utils/google-sheet";

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <div>
        <h1>Notes</h1>
        <AddNote />
      </div>
      <div className={styles.grid}>
        {notes?.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

const Note = ({ note }: any) => {
  const { id, title, content, created } = note || {};
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
};
