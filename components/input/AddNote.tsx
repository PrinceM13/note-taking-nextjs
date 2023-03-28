"use client";

import { useState } from "react";

import Button from "./Button";
import InputBox from "./InputBox";
import TextBox from "./TextBox";

type Note = {
  title: string;
  content: string;
};

const initialNote: Note = { title: "", content: "" };

export default function AddNote() {
  const [newNote, setNewNote] = useState(initialNote);

  const handleInput = (e: any) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <label>title:</label>
      <InputBox value={newNote.title} name="title" onChange={handleInput} />
      <label>content:</label>
      <TextBox value={newNote.content} name="content" onChange={handleInput} />
      <Button>Add</Button>
    </div>
  );
}
