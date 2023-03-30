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

export default function AddNote() {
  const [newNote, setNewNote] = useState(initialNote);

  const handleInput = (e: any) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    const updateRes = await axios.put(`${API_URL}/google-sheet/counter`);

    await axios.post(`${API_URL}/google-sheet`, {
      id: updateRes.data,
      title: newNote.title,
      content: newNote.content
    });

    // clear conditon
    setNewNote(initialNote);
  };

  return (
    <div>
      <label>title:</label>
      <InputBox value={newNote.title} name="title" onChange={handleInput} />
      <label>content:</label>
      <TextBox value={newNote.content} name="content" onChange={handleInput} />
      <Button onClick={handleClick}>Add</Button>
    </div>
  );
}
