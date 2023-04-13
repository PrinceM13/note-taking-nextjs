"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "../Notes.module.css";

type Note = {
  id: number;
  title: string;
  content: string;
};

const initialNote: Note = { id: 0, title: "", content: "" };

export default function NotePage({ params }: any) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [note, setNote] = useState<Note>(initialNote);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await axios.get(`${API_URL}/google-sheet/notes/${+params.id}`);
      setNote(res.data);
      setIsLoading(false);
    };
    fetchNote();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Note: {params.id}</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.note}>
          <h2>{note.title}</h2>
          <h5>{note.content}</h5>
        </div>
      )}
    </div>
  );
}
