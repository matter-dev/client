import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Logo from "../components/Logo";
import { useStore } from "../hooks/store";
import { publicApi } from "../services/api";

import imageUrl from "../assets/images/signin.webp";

const SigninPage: FC = () => {
  const setUser = useStore((state) => state.setUser);
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    values
  ) => {
    const res = await publicApi.post("/api/v1/users/signin", values);
    localStorage.setItem("matterToken", res.data.result.token);
    setUser(res.data.result.user);
  };

  return (
    <main className="md:grid md:grid-cols-2">
      <section className="py-12 w-1/2 mx-auto">
        <nav>
          <Logo />
        </nav>

        <div className="py-24">
          <h1 className="text-3xl font-head">Welcome back!</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="py-12 space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Email address
              </label>
              <input
                type="email"
                className="flex-1 bg-gray-200 p-2 rounded border-none outline-none text-lg"
                placeholder="Your email address"
                {...register("email", {
                  required: "Email is required",
                })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="font-medium">
                Password
              </label>
              <input
                type="password"
                className="flex-1 bg-gray-200 p-2 rounded border-none outline-none text-lg"
                placeholder="A strong password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </div>
            <button
              type="submit"
              className="bg-primary py-3 px-6 text-white font-bold rounded"
            >
              Sign in
            </button>
          </form>
        </div>
      </section>
      <img
        src={imageUrl}
        alt="people working"
        height="100vh"
        width="100%"
        className="h-screen w-full object-cover"
      />
    </main>
  );
};

export default SigninPage;
