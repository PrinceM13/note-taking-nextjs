import { addNote } from "../../../utils/google-sheet";

export async function POST(request: Request) {
  console.log("-------> ", await request.json());
  addNote();
  return new Response("xxx");
}
