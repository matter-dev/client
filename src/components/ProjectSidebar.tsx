import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../hooks/store";
import Logo from "./Logo";

const ProjectSidebar: FC = () => {
  const { user, setUser, project } = useStore();

  const baseClasses =
    "text-lg hover:bg-white hover:text-primary py-3 px-8 transition-all cursor-pointer hover:font-bold";

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
        <div className="text-lg px-8 flex flex-col">
          <span className="text-xs">Logged in as</span>
          {user && user.profile && user.profile.name}
        </div>
        <div className="mt-4 text-2xl px-8 flex flex-col">
          {project && project.name}
        </div>
        <ul className="py-8 flex flex-col">
          <NavLink
            to="/project"
            className={({ isActive }) =>
              isActive
                ? `${baseClasses} font-bold bg-white text-primary`
                : baseClasses
            }
          >
            Overview
          </NavLink>
          <NavLink
            to="tasks"
            className={({ isActive }) =>
              isActive
                ? `${baseClasses} font-bold bg-white text-primary`
                : baseClasses
            }
          >
            Tasks
          </NavLink>
        </ul>
        <div className="flex items-center justify-center my-8">
          <button
            className="bg-white text-red-600 py-2 px-6 rounded text-lg font-bold"
            onClick={handleSignout}
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default ProjectSidebar;
