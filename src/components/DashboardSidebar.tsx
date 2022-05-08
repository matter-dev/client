import type { FC } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardSidebar: FC = () => {
  return (
    <>
      <Sidebar>
        <ul className="py-8 flex flex-col">
          <NavLink
            to="projects"
            className={({ isActive }) =>
              isActive
                ? `menu-item font-bold bg-white text-primary`
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
