import { DB_GOOGLE_SHEET, DB_POCKETBASE, SELECTED_DATABASE } from "@/config/constant";
import Link from "next/link";
import styles from "./Notes.module.css";

const getNotes = async () => {
  if (SELECTED_DATABASE === DB_POCKETBASE) {
    const res = await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
      cache: "no-store"
    });
    const data = await res.json();
    return data?.items as any[];
  } else if (SELECTED_DATABASE === DB_GOOGLE_SHEET) {
    const res = await fetch("http://localhost:3219/api/google-sheet", {
      cache: "no-store"
    });
    const data = await res.json();
    return data as any[];
  }
};

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes</h1>
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
