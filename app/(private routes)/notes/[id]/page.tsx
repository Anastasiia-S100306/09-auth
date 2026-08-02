// app/notes/[id]/page.tsx

import {dehydrate, QueryClient} from "@tanstack/query-core";
import {fetchNoteById} from "@/lib/api/serverApi";
import {HydrationBoundary} from "@tanstack/react-query";
import NoteDetailsClient from "@/app/(private routes)/notes/[id]/NoteDetails.client";
import {Metadata} from "next";

interface NoteDetailsProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({params}: NoteDetailsProps): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchNoteById(id);

    return  {
        title: note.title,
        description: note.content.slice(0, 30),
        openGraph: {
            title: `Note: ${note.title}`,
            description: note.content.slice(0, 30),
            url: `https://08-zustand-seven-pied.vercel.app/${id}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: note.title,
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: `Note: ${note.title}`,
            description: note.content.slice(0, 30),
            images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
        }
    }
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
    const { id } = await params;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient />
        </HydrationBoundary>
    );
}