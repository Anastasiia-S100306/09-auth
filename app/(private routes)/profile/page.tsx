import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "User profile page",
};

export default async function ProfilePage() {
  const user = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.title}>Profile</h1>

        {user && (
          <div className={css.info}>
            {user.avatar && (
              <Image
                src={user.avatar}
                alt={user.username || "User avatar"}
                width={100}
                height={100}
                className={css.avatar}
              />
            )}
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}

        <Link href="/profile/edit" className={css.button}>
          Edit Profile
        </Link>
      </div>
    </main>
  );
}