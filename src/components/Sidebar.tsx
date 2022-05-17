import type { FC, ReactNode } from "react";
import { useStore } from "../hooks/store";
import Logo from "./Logo";

const Sidebar: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, setUser } = useStore();

  const handleSignout = () => {
    localStorage.removeItem("matterToken");
    setUser(null);
  };

  return (
    <aside className="h-full bg-purple-900 text-white">
      <div className="p-8">
        <Logo />
      </div>
      <div className="">
        <div className="flex flex-col px-8 text-3xl">
          <span className="text-lg">Welcome,</span>
          {user && user.profile && user.profile.name}
        </div>
        {children}
      </div>
      <div className="my-8 flex items-center justify-center">
        <button
          className="rounded bg-white py-2 px-6 text-lg font-bold text-red-600"
          onClick={handleSignout}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
