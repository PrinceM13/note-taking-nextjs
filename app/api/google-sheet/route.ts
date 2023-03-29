import { addNote } from "../../../utils/google-sheet";

export async function POST(request: Request) {
  const body = await request.json();
  await addNote(body);
  return new Response("note created !");
}
