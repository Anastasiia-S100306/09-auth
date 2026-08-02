"use client";

import Modal from "@/components/Modal/Modal";
import {fetchNoteById} from "@/lib/api/clientApi";
import Loading from "@/app/loading";
import css from "./NotePreview.module.css"

import {useRouter} from "next/navigation";
import {useQuery} from "@tanstack/react-query";

interface NotePreviewClientProps {
    id: string;
}

export default function NotePreviewClient({id}: NotePreviewClientProps) {
    const router = useRouter();

    const {data: note, isLoading, isError} = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });

    const handleBack = () => {
        router.back();
    }
if (isLoading) {
        return (
            <Modal onClose={handleBack}>
                <Loading/>
            </Modal>
        )
    }

    if (isError || !note) {
        return (
            <Modal onClose={handleBack}>
                <p>Something went wrong</p>
            </Modal>
        )
    }

    const formattedDate = new Date(note.createdAt).toLocaleDateString("en-Us", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: '2-digit',
        minute: '2-digit',
    });
    return (
        <Modal onClose={handleBack}>
            <main className={css.main}>
                <div className={css.container}>
                    <div className={css.item}>
                        <button className={css.backBtn}
                                type="button"
                                onClick={handleBack}>
                            Back
                        </button>
                        <div className={css.header}>
                            <h2>{note.title}</h2>
                        </div>
                        <p className={css.tag}>{note.tag}</p>
                        <p className={css.content}>{note.content}</p>
                        <p className={css.date}>{formattedDate}</p>
                    </div>
                </div>
            </main>
        </Modal>
    );
};