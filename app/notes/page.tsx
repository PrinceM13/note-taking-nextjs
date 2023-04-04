"use client";

import styles from "./Notes.module.css";
import AddNote from "@/components/input/AddNote";
import axios from "axios";
import { useEffect, useState } from "react";
import ToolBar from "@/components/toolbar/ToolBar";
import Hr from "@/components/Hr";
import { useRouter } from "next/navigation";

type Note = {
  id: any;
  title: string;
  content: string;
};

export default function NotesPage() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewNote, setIsNewNote] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await axios.get(`${API_URL}/google-sheet`);
      setNotes(res.data);
      setIsLoading(false);
      setIsNewNote(false);
    };
    isNewNote && fetchNotes();
  }, [isNewNote]);

  return (
    <div>
      <div>
        <h1>Notes</h1>
        <AddNote onAddNote={() => setIsNewNote(true)} />
      </div>
      <div className={styles.grid}>
        {isLoading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <p>No note found</p>
        ) : (
          notes.map((note) => (
            <Note key={note.id} note={note} onDeleteNote={() => setIsNewNote(true)} />
          ))
        )}
      </div>
    </div>
  );
}

const Note = ({ note, onDeleteNote }: any) => {
  const router = useRouter();
  const { id, title, content, created } = note || {};
  const handleClickNote = (id: number) => {
    router.push(`/notes/${id}`);
  };

  return (
    <div onClick={() => handleClickNote(id)} className="click">
      <div className={styles.note}>
        <h2>{title}</h2>
        <Hr />
        <h5>{content}</h5>
        <Hr />
        <ToolBar onDeleteNote={onDeleteNote} id={id} />
      </div>
    </div>
  );
};
