import type { FC } from "react";
import { NavLink } from "react-router-dom";
import { useStore } from "../hooks/store";
import Sidebar from "./Sidebar";

const ProjectSidebar: FC = () => {
  const { project } = useStore();

  return (
    <>
      <Sidebar>
        <ul className="flex flex-col py-8">
          <NavLink
            to={`/dashboard/projects`}
            end
            className={({ isActive }) =>
              isActive
                ? `menu-item bg-white font-bold text-primary`
                : "menu-item"
            }
          >
            Back to projects
          </NavLink>
          <NavLink
            to={`/project/${project ? project.id : ""}/overview`}
            end
            className={({ isActive }) =>
              isActive
                ? `menu-item bg-white font-bold text-primary`
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
                ? `menu-item bg-white font-bold text-primary`
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
