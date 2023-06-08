"use client";
import { signIn, getCsrfToken, getProviders } from "next-auth/react";
import Image from "next/image";
import RegisterForm from "@/components/auth/FormSign";

export default async function Page() {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken();

  return (
    <div className={`z-10 flex min-h-screen items-center`}>
      <div className="m-5 rounded-3xl bg-white p-3 shadow-lg">
        <div className="flex items-start justify-center bg-white/80">
          <Image
            src="/favicon/favicon-full.png"
            width={70}
            height={70}
            alt="App Logo"
          />
        </div>
        {providers != null &&
          Object.values(providers).map((provider) => {
            if (provider.name !== "Email") {
              return (
                <div
                  className="flex justify-center"
                  key={provider.name}
                  defaultValue={csrfToken}
                >
                  <button
                    className="my-2 rounded-lg bg-black p-2 text-white duration-300  hover:bg-slate-500 hover:text-yellow-500 "
                    onClick={async () => await signIn(provider.id)}
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              );
            }
          })}
        <RegisterForm />
      </div>
    </div>
  );
}
