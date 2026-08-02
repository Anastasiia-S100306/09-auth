'use client';

import css from "./NoteForm.module.css"

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createNote} from "@/lib/api/clientApi";
import toast from "react-hot-toast";
import React, {useId} from "react";
import {useRouter} from "next/navigation";
import {useNoteDraftStore} from "@/lib/store/noteStore";

export default function NoteForm() {
    const queryClient = useQueryClient();
    const fieldId = useId();
    const router = useRouter();

    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            clearDraft();
            queryClient.invalidateQueries({queryKey: ["notes"]});
            toast.success("New note created");
            router.push("/notes/filter/all")
        },
        onError: () => {
            toast.error("Failed to create note");
        }
    });
    const handleCancel = () => {
        router.back();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setDraft({
            ...draft,
            [name]: value
        });
    }

    const handleSubmit = async (formData: FormData) => {
        const values  = {
            title: String(formData.get("title") ?? ""),
            content: String(formData.get("content") ?? ""),
            tag: String(formData.get("tag") ?? "Todo"),
        }
        // console.log(values.title, values.content, values.tag)

        await mutation.mutateAsync(values);
    }

    return (
        <>
        <form className={css.form} action={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId} - title`}>Title</label>
                    <input
                        id={`${fieldId} - title`}
                        type="text"
                        name="title"
                        className={css.input}
                        value={draft.title}
                        onChange={handleChange}
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId} - content`}>Content</label>
                    <textarea
                        id={`${fieldId} - content`}
                        name="content"
                        rows={8}
                        className={css.textarea}
                        value={draft.content}
                        onChange={handleChange}
                    >
                </textarea>
                </div>
<div className={css.formGroup}>
                    <label htmlFor={`${fieldId} - tag`}>Tag</label>
                    <select
                        name="tag"
                        id={`${fieldId} - tag`}
                        className={css.select}
                        value={draft.tag}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select tag</option>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </select>
                </div>

                <div className={css.actions}>
                    <button
                        type="button"
                        className={css.cancelButton}
                        onClick={handleCancel}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={mutation.isPending}
                    >
                         {mutation.isPending
                            ? "Creating..."
                            : "Create note"}
                    </button>
                </div>
            </form>
        </>
    );
}