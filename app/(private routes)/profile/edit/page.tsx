"use client";

import css from "./EditProfilePage.module.css"
import {useAuthStore} from "@/lib/store/authStore";
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import Image from "next/image";
import {updateMe} from "@/lib/api/clientApi";


export default function EditProfilePage() {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const [editUserName, setEditUserName] = useState<string | null>(null);
    const username = editUserName ?? user?.username ?? ""

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditUserName(event.target.value);
    }

    const handleSaveUser = async (event: React.SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updateUserName = await updateMe({username});
        setUser(updateUserName);
        router.push("/profile");
    }

    const handleCancel = () => {
        router.push("/profile");
    }
    if (!user) {
        return null;
    }

    return (
        <>
            <main className={css.mainContent}>
                <div className={css.profileCard}>
                    <h1 className={css.formTitle}>Edit Profile</h1>

                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />

                    <form
                        className={css.profileInfo}
                        onSubmit={handleSaveUser}
                    >
                        <div className={css.usernameWrapper}>
                            <label htmlFor="username">Username: {user?.username}</label>
                            <input id="username"
                                   type="text"
                                   className={css.input}
                                   value={username}
                                   onChange={handleChange}
                            />
                        </div>

                        <p>Email: {user?.email}</p>

                        <div className={css.actions}>
                            <button
                                type="submit"
                                className={css.saveButton}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                className={css.cancelButton}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </main>
            </>
    );
};