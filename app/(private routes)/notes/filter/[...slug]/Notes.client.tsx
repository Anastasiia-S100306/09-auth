"use client";

import toast, {Toaster} from "react-hot-toast";
import {useDebouncedCallback} from "use-debounce";
import {useEffect, useState} from "react";

import css from "./page.module.css"
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import Loader from "@/components/Loader/Loader";
import Link from "next/link";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {fetchNotes, NoteServiceResponse} from "@/lib/api/clientApi";


interface NotesClientProps {
    tag?: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
const {
        data,
        error,
        isError,
        isSuccess,
        isLoading,
    } = useQuery<NoteServiceResponse>({
            queryKey: ["notes", tag, search, page],
            queryFn: () => fetchNotes({search, page, tag}),
            placeholderData: keepPreviousData,
            refetchOnMount: false,
        })

    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 0;

    useEffect(() => {
        if (isSuccess && notes.length === 0) {
            toast.error("No notes found for your request");
        }
    }, [isSuccess, notes.length]);

    const handleSearch = useDebouncedCallback((searchQuery: string) => {
        setSearch(searchQuery);
        setPage(1);
    }, 1000);

return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <Toaster
                    position="top-center"/>
                <SearchBox
                    onSearch={handleSearch}/>
                {totalPages > 1 &&
                    (<Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage} />)}
                <Link
                     className={css.button}
                     href="/notes/action/create">
                    Create note +
                </Link>
            </header>

            {isLoading && <Loader/>}
            {isError && <ErrorMessage errorMessage={`Something went wrong. Please try again. ${error.message}`}/>}
            {isSuccess && notes.length > 0 && (<NoteList notes={notes}/>)}
        </div>
    );
}