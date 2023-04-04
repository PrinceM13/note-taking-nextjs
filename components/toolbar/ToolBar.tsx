import { BiTrash, BiEdit } from "react-icons/bi";
export default function ToolBar() {
  const handleEdit = (e: any) => {
    e.stopPropagation();
    console.log("edit");
  };
  const handleDelete = (e: any) => {
    e.stopPropagation();
    console.log("deletes");
  };
  return (
    <div className="toolbar">
      <div onClick={handleEdit}>
        <BiEdit />
      </div>
      <div onClick={handleDelete}>
        <BiTrash />
      </div>
    </div>
  );
}
