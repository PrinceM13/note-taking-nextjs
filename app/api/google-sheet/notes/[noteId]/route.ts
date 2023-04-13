import { deleteNote, getNote, updateNote } from "@/utils/google-sheet";

export async function GET(request: Request, context: { params: any }) {
  // get params
  const {
    params: { noteId }
  } = context;
  const note = await getNote(+noteId);
  return new Response(JSON.stringify(note));
}

export async function DELETE(request: Request, context: { params: any }) {
  // get params
  const {
    params: { noteId }
  } = context;
  const note = await deleteNote(+noteId);
  return new Response("note deleted !");
}

export async function PATCH(request: Request, context: { params: any }) {
  // get params
  const {
    params: { noteId }
  } = context;

  // get body
  const body = await request.json();
  const note = await updateNote(+noteId, body);
  return new Response("note updated !");
}
