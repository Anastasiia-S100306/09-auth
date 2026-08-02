"use client";

import  css from "./SignInPage.module.css"
import {useRouter} from "next/navigation";
import {useState} from "react";
import {ApiError, AuthResponse, login} from "@/lib/api/clientApi";
import {useAuthStore} from "@/lib/store/authStore";


export default function SignIn() {
    const router = useRouter();
    const [ error, setError ] = useState("");

    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (formData: FormData) => {
            const formValues: AuthResponse = {
                email: String(formData.get("email")),
                password: String(formData.get("password")),
            };

        try {
            const user = await login(formValues);

            if(user) {
                setUser(user);
                router.push("/profile");
            }
            } catch (error) {
            const apiError = error as ApiError;
            setError(
                apiError.response?.data?.error
                ?? apiError.message
                ?? "Failed to login"
            )
        }
    }

    return (
        <>
            <main className={css.mainContent}>
                <form
                    className={css.form}
                    action={handleSubmit}>
                    <h1 className={css.formTitle}>Sign in</h1>

                    <div className={css.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className={css.input}
                            required/>
                    </div>
<div className={css.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            className={css.input}
                            required/>
                    </div>

                    <div className={css.actions}>
                        <button
                            type="submit"
                            className={css.submitButton}>
                            Log in
                        </button>
                    </div>

                    <p className={css.error}>{error}</p>
                </form>
            </main>
        </>
    );
};