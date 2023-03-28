import { DB_GOOGLE_SHEET, SELECTED_DATABASE } from "@/config/constant";
import Link from "next/link";
import styles from "./Notes.module.css";
import { google } from "googleapis";

type GoogleCredentials = {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
};

const getNotes = async () => {
  if (SELECTED_DATABASE === DB_GOOGLE_SHEET) {
    const credentials: GoogleCredentials = {
      type: process.env.TYPE || "",
      project_id: process.env.PROJECT_ID || "",
      private_key_id: process.env.PRIVATE_KEY_ID || "",
      private_key: process.env.PRIVATE_KEY || "",
      client_email: process.env.CLIENT_EMAIL || "",
      client_id: process.env.CLIENT_ID || "",
      auth_uri: process.env.AUTH_URI || "",
      token_uri: process.env.TOKEN_URI || "",
      auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL || "",
      client_x509_cert_url: process.env.CLIENT_X509_CERT_URL || ""
    };

    if (true) {
      const auth = await google.auth.getClient({
        credentials,
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
      return tempNotes;
    } else {
      // // connect to google sheet through api (work on local but not work on vercel)
      // const res = await fetch("http://localhost:3219/api/google-sheet", {
      //   cache: "no-store"
      // });
      // const data = await res.json();
      // return data as any[];
    }
  }
};

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
}

const Note = ({ note }: any) => {
  const { id, title, content, created } = note || {};
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
};
