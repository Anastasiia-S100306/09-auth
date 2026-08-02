import {HydrationBoundary} from "@tanstack/react-query";
import {dehydrate, QueryClient} from "@tanstack/query-core";
import {fetchNoteById} from "@/lib/api/serverApi";
import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";


interface NotePreviewProps {
    params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: NotePreviewProps) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient id={id} />
        </HydrationBoundary>
    );
};