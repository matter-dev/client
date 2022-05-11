import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const IndexPage: FC = () => {
  return (
    <main className="min-h-[80vh] bg-gray-100">
      <header className="mx-auto flex min-h-[80vh] w-2/3 flex-col">
        <nav className="absolute top-0 flex h-[80px] items-center">
          <Logo />
        </nav>
        <section className="flex-1 md:grid md:grid-cols-[2fr_1fr]">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="py-8 font-head text-7xl leading-normal ">
              Manage your projects with ease.
            </h1>

            <div className="flex w-[80%] items-center gap-4 text-lg">
              <Link
                to="/signin"
                className="rounded bg-primary py-3 px-6 text-lg font-bold text-white"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded border-2 border-primary py-3 px-6 text-lg font-bold text-primary"
              >
                Sign up
              </Link>
            </div>
          </div>
        </section>
      </header>
    </main>
  );
};

export default IndexPage;
