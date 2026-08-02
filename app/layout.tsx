import type {Metadata} from "next";
import {Roboto} from 'next/font/google';

import './globals.css';

import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import React from "react";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-roboto",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Note Hub",
    description: "Created by GoIt",
    openGraph: {
        title: "Note Hub",
        description: "Created by GoIt",
        url: "https://08-zustand-seven-pied.vercel.app/",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "Note Hub",
            }
        ],
        type: "article",
    }
};

export default function RootLayout({
                                       children,
                                       modal,
                                   }: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${roboto.variable}`}>
        <body>
        <TanStackProvider>
            <AuthProvider>
                <Header/>
                <main>
                    {children}
                    {modal}
                </main>
                <div id="modal-root"></div>
                <Footer/>
            </AuthProvider>
        </TanStackProvider>
        </body>
        </html>
    );
}