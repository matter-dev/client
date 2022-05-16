import type { FC } from "react";
import { Outlet } from "react-router-dom";

const TaskHOC: FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default TaskHOC;
