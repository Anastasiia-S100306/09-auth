"use client";

import css from "./SignUpPage.module.css"
import {useRouter} from "next/navigation";
import {ApiError, AuthResponse, register} from "@/lib/api/clientApi"
import {useState} from "react";

import {useAuthStore} from "@/lib/store/authStore"


export default function SignUp() {
    const router = useRouter();
    const [error, setError] = useState("");
    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (formData: FormData) => {
        const formValues: AuthResponse = {
            email: String(formData.get("email")),
            password: String(formData.get("password")),
        };
        setError("");

        try {
            const user = await register(formValues);

            if (user) {
                setUser(user)
                router.push("/profile");
            }
            } catch (error) {
            const apiError = error as ApiError;
            setError(
                apiError.response?.data?.error
                ?? apiError.message
                ?? "Failed to register",
            );
        }
    }

    return (
        <>
            <main className={css.mainContent}>
                <h1 className={css.formTitle}>Sign up</h1>
                <form className={css.form} action={handleSubmit}>
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
                        <button type="submit" className={css.submitButton}>
                            Register
                        </button>
                    </div>
                    <p className={css.error}>{error}</p>
                </form>

            </main>
        </>
    );
};        