import { google } from "googleapis";

export async function GET(request: Request) {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  });
  const googleSheet = google.sheets({ version: "v4", auth });
  const range = `Sheet1!A:C`;
  const res = await googleSheet.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range
  });

  const columnName = res.data.values?.shift();
  let tempNotes;
  if (columnName) {
    tempNotes = res.data.values?.reduce((acc, el) => {
      acc.push({ [columnName[0]]: el[0], [columnName[1]]: el[1], [columnName[2]]: el[2] });
      return acc;
    }, []);
  }

  const notes = JSON.stringify(tempNotes);
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  };
  return new Response(notes, { headers, status: 200 });
}

export async function POST(request: Request) {
  return new Response("gg sheet post");
}
