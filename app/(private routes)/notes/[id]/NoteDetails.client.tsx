"use client";

import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {fetchNoteById} from "@/lib/api/clientApi";
import Loading from "@/app/loading"

import css from "./page.module.css"

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();

    const { data: note, isLoading, isError } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    if(isLoading) {
        return <Loading />
    }

    if(isError || !note) {
        return <p>Something went wrong</p>
    }

    const formattedDate = new Date(note.createdAt).toLocaleDateString("en-Us", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: '2-digit',
        minute: '2-digit',
    });
    return (
        <main className={css.main}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                    </div>
                    <p className={css.tag}>{note.tag}</p>
                    <p className={css.content}>{note.content}</p>
                    <p className={css.date}>{formattedDate}</p>
                </div>
            </div>
        </main>
    )
}