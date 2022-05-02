import type { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const IndexPage: FC = () => {
  return (
    <main className="min-h-[80vh] bg-gray-100">
      <header className="min-h-[80vh] w-2/3 mx-auto flex flex-col">
        <nav className="h-[80px] flex items-center absolute top-0">
          <Logo />
        </nav>
        <section className="md:grid md:grid-cols-[2fr_1fr] flex-1">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="font-head text-7xl py-8 leading-normal ">
              Manage your projects with ease.
            </h1>

            <div className="w-[80%] flex items-center text-lg gap-4">
              <Link
                to="/signin"
                className="bg-primary text-white py-3 px-6 text-lg font-bold rounded"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="border-2 border-primary py-3 px-6 text-lg text-primary font-bold rounded"
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
