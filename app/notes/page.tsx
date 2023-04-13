"use client";

import styles from "./Notes.module.css";
import AddNote from "@/components/input/AddNote";
import axios from "axios";
import { useEffect, useState } from "react";
import ToolBar from "@/components/toolbar/ToolBar";
import Hr from "@/components/Hr";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

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
  const [isEdit, setIsEdit] = useState(false);

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
    <>
      <Modal isOpen={isEdit} onClose={() => setIsEdit(false)}>
        <Note note={notes[2]} isEdit={isEdit} />
      </Modal>
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
              <Note
                key={note.id}
                note={note}
                onDeleteNote={() => setIsNewNote(true)}
                onEditNote={() => setIsEdit(true)}
                isEdit={false}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

const Note = ({ note, onDeleteNote, onEditNote, isEdit }: any) => {
  const router = useRouter();
  const { id, title, content, created } = note || {};
  const handleClickNote = (id: number) => {
    router.push(`/notes/${id}`);
  };

  return (
    <div
      onClick={isEdit ? () => {} : () => handleClickNote(id)}
      className={`${isEdit ? "" : "click"}`}
    >
      <div className={styles.note}>
        <h2>{title}</h2>
        <Hr />
        <h5>{content}</h5>
        <Hr />
        <ToolBar onDeleteNote={onDeleteNote} onEditNote={onEditNote} isEdit={isEdit} id={id} />
      </div>
    </div>
  );
};
