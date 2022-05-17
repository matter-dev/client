import type { FC } from "react";
import { useQuery } from "react-query";
import { Outlet, useParams } from "react-router-dom";
import { useStore } from "../hooks/store";
import { privateApi } from "../services/api";

const ProjectPage: FC = () => {
  const { projectId } = useParams();
  const { setProject } = useStore();

  const { isLoading, error } = useQuery(
    ["fetchProject", projectId],
    async () => {
      const res = await privateApi.get(`/api/v1/projects/${projectId}`);
      setProject(res.data.result.project);
      return res.data.result.project;
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops! Unable to load project. Please try again later.</div>;
  }

  return (
    <div className="p-8">
      <Outlet />
    </div>
  );
};

export default ProjectPage;
