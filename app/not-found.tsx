import css from"./page.module.css"
import Link from "next/link";
import type {Metadata} from "next";


export const metadata: Metadata = {
    title: "404 - Page not found | NoteHub",
    description: "Sorry, the page you are looking for does not exist",
    openGraph: {
        title: "404 - Page not found | NoteHub",
        description: "Sorry, the page you are looking for does not exist",
        url: "https://08-zustand-seven-pied.vercel.app/",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "Note Hub",
            }
        ],
    }
};
export default function NotFound() {

    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
            <Link href="/">Go back</Link>
        </>
    );
};