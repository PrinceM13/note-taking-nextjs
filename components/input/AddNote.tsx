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

export default function AddNote() {
  const [newNote, setNewNote] = useState(initialNote);

  const handleInput = (e: any) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    const res = await axios.post("http://localhost:3219/api/google-sheet", {
      title: "mmm",
      content: "nnn"
    });
    console.log(res.data);
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
