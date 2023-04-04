import axios from "axios";
import { useState } from "react";
import { BiTrash, BiEdit } from "react-icons/bi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ToolBar({ onDeleteNote, id }: any) {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleEdit = (e: any) => {
    e.stopPropagation();
    console.log("edit");
  };
  const handleDelete = async (e: any) => {
    e.stopPropagation();
    setIsDeleting(true);
    await axios.delete(`${API_URL}/google-sheet/notes/${id}`);

    // to update NotesPage
    onDeleteNote();

    // // clear condition
    // setIsDeleting(false);
  };

  return (
    <>
      {isDeleting ? (
        <div style={{ color: "red" }}>Deleting this note...</div>
      ) : (
        <div className="toolbar">
          <div onClick={handleEdit}>
            <BiEdit />
          </div>
          <div onClick={handleDelete}>
            <BiTrash />
          </div>
        </div>
      )}
    </>
  );
}
