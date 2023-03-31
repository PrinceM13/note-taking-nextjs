"use client";

import { useState } from "react";
import axios from "axios";

import Button from "./Button";
import InputBox from "./InputBox";
import TextBox from "./TextBox";

type Note = {
  title: string;
  content: string;
};

const initialNote: Note = { title: "", content: "" };
const API_URL = process.env.NEXT_PUBLIC_API_URL;

type AddNoteProps = { onAddNote: () => any };

export default function AddNote({ onAddNote }: AddNoteProps) {
  const [newNote, setNewNote] = useState(initialNote);
  const [isUploading, setIsUploading] = useState(false);

  const handleInput = (e: any) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    setIsUploading(true);
    const updateRes = await axios.put(`${API_URL}/google-sheet/counter`);

    await axios.post(`${API_URL}/google-sheet`, {
      id: updateRes.data,
      title: newNote.title,
      content: newNote.content
    });

    // to update NotesPage
    onAddNote();

    // clear conditon
    setNewNote(initialNote);
    setIsUploading(false);
  };

  return (
    <div>
      <label>title:</label>
      <InputBox value={newNote.title} name="title" onChange={handleInput} />
      <label>content:</label>
      <TextBox value={newNote.content} name="content" onChange={handleInput} />
      <Button onClick={handleClick}>Add</Button>
      {isUploading && <p>Adding new note...</p>}
    </div>
  );
}
