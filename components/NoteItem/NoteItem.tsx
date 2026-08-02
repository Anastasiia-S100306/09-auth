import {Note} from "@/types/note";
import Link from "next/link";

interface NoteItemProps {
    item: Note;
}

export default function NoteItem({ item }: NoteItemProps) {
    return (
        <li>
            <Link href={`/notes/${item.id}`}>{item.id}</Link>
        </li>
    )
}