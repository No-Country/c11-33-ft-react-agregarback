"use client";
import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import Image from "next/image";
import styles from "../signin/Signin.module.css";
import RegisterForm from "@/components/layout/authForm/FormSign";

export default async function page() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();
  return (
    <div>
      <div className={styles.wrapper} />
      <div className={styles.content}>
        <div className={`${styles.cardWrapper} z-10`}>
          <Image
            src="/favicon/android-chrome-512x512.png"
            width={70}
            height={70}
            alt="App Logo"
          />
          <div className={styles.cardContent}>
            <hr />
            {providers != null &&
              Object.values(providers).map((provider) => {
                if (provider.name !== "Email") {
                  return (
                    <div
                      key={provider.name}
                      defaultValue={csrfToken}
                      style={{ marginBottom: 0 }}
                    >
                      <button
                        className="my-2 bg-black duration-300 hover:bg-slate-500"
                        onClick={async () => await signIn(provider.id)}
                      >
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
