import { addNote, getNotes } from "../../../utils/google-sheet";

export async function POST(request: Request) {
  const body = await request.json();
  await addNote(body);
  return new Response("note created !");
}

export async function GET(request: Request) {
  const notes = await getNotes();
  return new Response(JSON.stringify(notes));
}
