import type { FC } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardSidebar: FC = () => {
  return (
    <>
      <Sidebar>
        <ul className="flex flex-col py-8">
          <NavLink
            to="projects"
            className={({ isActive }) =>
              isActive
                ? `menu-item bg-white font-bold text-primary`
                : "menu-item"
            }
          >
            Projects
          </NavLink>
        </ul>
      </Sidebar>
    </>
  );
};

export default DashboardSidebar;
