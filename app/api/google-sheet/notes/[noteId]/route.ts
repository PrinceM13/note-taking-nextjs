import { getNote } from "@/utils/google-sheet";

export async function GET(request: Request) {
  // will check for better ways (without manually splitting)
  const urlPath = request.url;
  const params = urlPath.split("/")[urlPath.split("/").length - 1];
  const note = await getNote(+params);
  return new Response(JSON.stringify(note));
}
