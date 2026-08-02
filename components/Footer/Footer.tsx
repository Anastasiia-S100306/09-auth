import css from "./Footer.module.css"
import Link from "next/link";


export default function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.content}>
                <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
                <div className={css.wrap}>
                    <p>Developer: Anastasiia Sydoruk </p>
                    <p>
                        Contact us:
                        <Link href="https://github.com/Anastasiia-S100306">Anastasiia Sydoruk</Link>
                    </p>
                </div>
            </div>
        </footer>

    )
}