import {HydrationBoundary} from "@tanstack/react-query";
import {dehydrate, QueryClient} from "@tanstack/query-core";
import {fetchNotes} from "@/lib/api/serverApi";
import NotesClient from "@/app/(private routes)/notes/filter/[...slug]/Notes.client";
import {Metadata} from "next";

interface NotePageProps {
    params: Promise<{slug: string[]}>;
}

export async function generateMetadata({params}: NotePageProps): Promise<Metadata>{
    const { slug } = await params;
    const tag = slug[0] === "All"
        ? undefined
        : slug[0];
    const title = tag
        ? `Notes ${tag}`
        : "All tags";
    const description = tag
        ? `Notes filtered by tag: ${tag}`
        : `All notes of NoteHub`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://08-zustand-seven-pied.vercel.app/notes/filter/${tag ?? "all"}`,
            images: [
                {
                    url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                    width: 1200,
                    height: 630,
                    alt: title,
                }
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: description.slice(0, 30),
            images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
        }
    }
}

export default async function NotePage({ params }: NotePageProps) {
    const { slug } = await params;
    const tag = slug[0] === "All"
        ? undefined
        : slug[0];


    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", tag, "", 1],
        queryFn: () => fetchNotes({search: "", page: 1, tag}),
    });


    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient key={tag ?? "All"} tag={tag} />
        </HydrationBoundary>

    )
};