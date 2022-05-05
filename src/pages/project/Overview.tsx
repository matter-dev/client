import type { FC } from "react";
import { useStore } from "../../hooks/store";

const Overview: FC = () => {
  const { project } = useStore();
  return (
    <div>
      <h1 className="font-head-bold text-2xl">{project.name}</h1>
      <div>Created at {new Date(project.createdAt).toLocaleString()}</div>
    </div>
  );
};

export default Overview;
