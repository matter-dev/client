import type { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";
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
        <div className="text-3xl px-8 flex flex-col">
          <span className="text-lg">Welcome,</span>
          {user && user.profile && user.profile.name}
        </div>
        {children}
      </div>
      <div className="flex items-center justify-center my-8">
        <button
          className="bg-white text-red-600 py-2 px-6 rounded text-lg font-bold"
          onClick={handleSignout}
        >
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
