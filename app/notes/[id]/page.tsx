import styles from "../Notes.module.css";

const getNote = async (noteId: string) => {
  const res = await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${noteId}`);
  const data = await res.json();
  return data;
};

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);
  return (
    <div>
      <h1>Note: {params.id}</h1>
      <div className={styles.note}>
        <h2>{note.title}</h2>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
    </div>
  );
}
