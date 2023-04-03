import { counterUp, getCounter } from "@/utils/google-sheet";

export async function GET() {
  const counter = await getCounter();
  return new Response(JSON.stringify(counter));
}

export async function PUT() {
  const newCounter = await counterUp();
  return new Response(JSON.stringify(newCounter));
}
