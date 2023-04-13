import axios from "axios";
import { useState } from "react";
import { BiTrash, BiEdit } from "react-icons/bi";
import EditModalButton from "./EditModalButton";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ToolBar({
  onDeleteNote,
  id,
  updateNotes,
  handleSeletedNoteToEdit,
  onDoneEditing,
  onCancel,
  isEdit,
  newNote
}: any) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEditButton = async (e: any) => {
    e.stopPropagation();

    // open editing modal
    handleSeletedNoteToEdit();
  };

  const handleUpdate = async () => {
    // to update to google sheet
    setIsUpdating(true);
    await axios.patch(`${API_URL}/google-sheet/notes/${id}`, newNote);

    // to update NotesPage
    updateNotes();

    // to close editing modal
    onDoneEditing();

    // clear condition
    setIsUpdating(false);
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
      {isDeleting && <div style={{ color: "red" }}>Deleting this note...</div>}
      {isUpdating && <div style={{ color: "green" }}>Updating this note...</div>}

      {isEdit
        ? !isUpdating && (
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <EditModalButton onClick={handleUpdate} color="green">
                Okay
              </EditModalButton>
              <EditModalButton onClick={onCancel} color="red">
                Cancel
              </EditModalButton>
            </div>
          )
        : !isDeleting && (
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
