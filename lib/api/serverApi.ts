import {nextServer} from "@/lib/api/api";
import {FetchNotesProps, NoteServiceResponse} from "@/lib/api/clientApi";
import type {Note} from "@/types/note";
import {cookies} from "next/headers";
import {User} from "@/types/user";

const PER_PAGE = 10;

export const fetchNotes = async ({search, page, tag}: FetchNotesProps): Promise<NoteServiceResponse> => {
    const cookieStore = await cookies();

    const { data } = await nextServer.get<NoteServiceResponse>("/notes", {
        params: {
            search,
            page,
            ...(tag && tag !=="all" && { tag }),
            perPage: PER_PAGE,
        },
        headers: {
            Cookie: cookieStore.toString(),
        }
    });
    return data;
}


export const fetchNoteById = async (id: string): Promise<Note> => {
    const cookieStore = await cookies();
    const { data } = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        }
        });
    return data;
}

export const checkSession = async () => {
    const cookieStore = await cookies();
    const response = await nextServer.get("/auth/session", {
        headers: {
            Cookie: cookieStore.toString(),
        }
    });
    return response;
}

export const getMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const { data } = await nextServer.get("/users/me", {
        headers: {
            Cookie: cookieStore.toString(),
        }
    });
    return data;
}