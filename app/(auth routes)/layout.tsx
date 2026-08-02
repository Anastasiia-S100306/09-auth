"use client";

import {useRouter} from "next/navigation";
import React, {useEffect} from "react";

interface PublicLayoutProps {
    children: React.ReactNode;
}

export default function PublicLayout({children}: PublicLayoutProps) {
    const router = useRouter();

    useEffect(() => {
        router.refresh();

    }, [router]);

    return children
};