import {fetchNotes, type NoteServiceResponse} from "@/lib/api/clientApi";
import {keepPreviousData, useQuery} from "@tanstack/react-query";


export default function useFetchNotes(search: string, page: number, tag?: string) {
    return useQuery<NoteServiceResponse>({
        queryKey: ["notes", tag, search, page],
        queryFn: () => fetchNotes({search, page, tag}),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    })
}