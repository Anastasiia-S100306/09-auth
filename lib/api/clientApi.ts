import { nextServer } from "./api"
import type {NoteFormData, Note} from "@/types/note";
import type {AxiosError} from "axios";
import {User} from "@/types/user";

const PER_PAGE = 10;

export type ApiError = AxiosError<{ error: string }>;

export interface AuthResponse {
    email: string;
    password: string;
}

type CheckSessionRequest = {
    success: boolean;
}

export type UpdateUserRequest = {
    username?: string;
    email?: string;
};
export interface NoteServiceResponse {
    notes: Note[];
    totalPages: number;
}

export interface FetchNotesProps {
    search: string;
    page: number;
    tag?: string;
}

export const fetchNotes = async ({search, page, tag}: FetchNotesProps): Promise<NoteServiceResponse> => {
    const { data } = await nextServer.get<NoteServiceResponse>("/notes", {
        params: {
            search,
            page,
            ...(tag && tag !=="all" && { tag }),
            perPage: PER_PAGE,
        }
    });
    return data;
}

export const createNote = async (noteData: NoteFormData): Promise<Note> => {
    const { data } = await nextServer.post<Note>("/notes", noteData);
    return data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const { data } = await nextServer.delete<Note>(`/notes/${id}`);
    return data;
}
export const fetchNoteById = async (id: string): Promise<Note> => {
    const { data } = await nextServer.get<Note>(`/notes/${id}`);
    return data;
}

export const register = async (userData: AuthResponse) => {
    const { data } = await nextServer.post<User>("/auth/register", userData);
    return data;
}

export const login = async (userData: AuthResponse) => {
    const { data } = await nextServer.post<User>("/auth/login", userData);
    return data;
}

export const logout = async (): Promise<void> => {
    await nextServer.post("/auth/logout");
}

export const checkSession = async (): Promise<boolean> => {
    const { data } = await nextServer.get<CheckSessionRequest>("/auth/session");
    return data.success;
}

export const getMe = async (): Promise<User> => {
    const { data } = await nextServer.get<User>("/users/me");
    return data;
}
export const updateMe = async (userData: UpdateUserRequest) => {
    const { data } = await nextServer.patch<User>("/users/me", userData);
    return data;
}