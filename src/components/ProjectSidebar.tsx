import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../hooks/store";
import Sidebar from "./Sidebar";

const ProjectSidebar: FC = () => {
  const { user, setUser, project } = useStore();

  return (
    <>
      <Sidebar>
        <ul className="py-8 flex flex-col">
          <NavLink
            to={`/project/${project ? project.id : ""}/overview`}
            end
            className={({ isActive }) =>
              isActive
                ? `menu-item font-bold bg-white text-primary`
                : "menu-item"
            }
          >
            Overview
          </NavLink>
          <NavLink
            end
            to={`/project/${project ? project.id : ""}/tasks`}
            className={({ isActive }) =>
              isActive
                ? `menu-item font-bold bg-white text-primary`
                : "menu-item"
            }
          >
            Tasks
          </NavLink>
        </ul>
      </Sidebar>
    </>
  );
};

export default ProjectSidebar;
