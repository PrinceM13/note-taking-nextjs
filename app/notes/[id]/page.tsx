import styles from "../Notes.module.css";

const getNote = async (noteId: string) => {
  type DataItem = {
    id: number;
    title: string;
    content: string;
    created: string;
  };

  const data: DataItem = { id: 999, title: "test", content: "work please", created: "2023" };
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
