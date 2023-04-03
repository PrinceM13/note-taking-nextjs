import { getNote } from "@/utils/google-sheet";

export async function GET(request: Request, context: { params: any }) {
  const {
    params: { noteId }
  } = context;
  const note = await getNote(+noteId);
  return new Response(JSON.stringify(note));
}
