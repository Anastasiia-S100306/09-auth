import css from "./NoteList.module.css"
import type {Note} from "@/types/note";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteNote} from "@/lib/api/clientApi"
import toast from "react-hot-toast";
import Link from "next/link";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({notes}: NoteListProps) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["notes"]});
            toast.success("Note deleted")
        },
        onError: () => {
            toast.error("Failed to delete note. Please try again");
        }
    });

    const handleDeleteNote = async (id: string) => {
        await mutation.mutateAsync(id)
    }
    return (
        <ul className={css.list}>
            {notes.map((note: Note) =>
                <li className={css.listItem} key={note.id}>
                    <h2 className={css.title}>{note.title}</h2>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <Link href={`/notes/${note.id}`} className={css.link}>View details</Link>
                        <button className={css.button}
                                onClick={() => handleDeleteNote(note.id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>)}
        </ul>
    );
}