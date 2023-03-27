import Link from "next/link";
import styles from "./Notes.module.css";

const getNotes = async () => {
  const res = await fetch(
    "https://note-taking-nextjs-nu.vercel.app/api/collections/notes/records",
    {
      cache: "no-store"
    }
  );
  //   const res = await fetch("http://127.0.0.1:8090/api/collections/notes/records", {
  //     cache: "no-store"
  //   });
  const data = await res.json();
  return data?.items as any[];
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