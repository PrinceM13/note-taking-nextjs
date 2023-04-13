import axios from "axios";
import { useState } from "react";
import { BiTrash, BiEdit } from "react-icons/bi";
import EditModalButton from "./EditModalButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ToolBar({
  onDeleteNote,
  id,
  handleSeletedNoteToEdit,
  onDoneEditing,
  isEdit
}: any) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditButton = async (e: any) => {
    e.stopPropagation();
    // await axios.patch(`${API_URL}/google-sheet/notes/${id}`, { hi: "hello", planet: "worlds" });
    handleSeletedNoteToEdit();

    // to update NotesPage
    console.log("edit");
  };

  const handleDelete = async (e: any) => {
    e.stopPropagation();
    setIsDeleting(true);
    await axios.delete(`${API_URL}/google-sheet/notes/${id}`);

    // to update NotesPage
    onDeleteNote();
  };

  return (
    <>
      {isDeleting ? (
        <div style={{ color: "red" }}>Deleting this note...</div>
      ) : isEdit ? (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
          <EditModalButton onClick={() => {}} color="green">
            Okay
          </EditModalButton>
          <EditModalButton onClick={onDoneEditing} color="red">
            Cancel
          </EditModalButton>
        </div>
      ) : (
        <div className="toolbar">
          <div onClick={handleEditButton}>
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
