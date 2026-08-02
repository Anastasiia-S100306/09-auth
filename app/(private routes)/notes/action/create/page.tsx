import css from "./page.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Create note",
    description: "Create new a note in NoteHub",
    openGraph: {
        title: "Create note",
        description: "Create new a note in NoteHub",
        url: "https://08-zustand-seven-pied.vercel.app/notes/action/create",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "Create note",
            }
        ],
    }
}

export default function CreateNote() {

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>
    )
}