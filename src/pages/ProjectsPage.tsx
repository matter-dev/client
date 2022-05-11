import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateProjectForm from "../components/CreateProjectForm";
import RightSidebar from "../components/RightSidebar";
import { privateApi } from "../services/api";

const ProjectsPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      const res = await privateApi.get("/api/v1/projects");
      setProjects(res.data.result.projects);
      setRefetch(false);
      setLoading(false);
    };
    if (refetch) {
      setLoading(true);
      getProjects();
    }
  }, [refetch]);

  const handleCreate = () => {
    setShowRightSidebar(true);
  };

  const handleAfterClose = () => {
    setRefetch(true);
  };

  return (
    <div>
      <div className="px-8">
        <main className="py-8">
          <h1 className="text-4xl font-head">Your projects</h1>
          <button
            className="my-8 bg-primary text-white py-2 px-4 text-lg rounded"
            onClick={handleCreate}
          >
            Create new
          </button>
          <ul className="flex flex-wrap gap-8">
            {loading ? (
              <div>Loading projects...</div>
            ) : projects.length === 0 ? (
              <div>
                No projects present. Press <code>Create New</code> to create
                one.
              </div>
            ) : (
              <>
                {projects.map((project) => (
                  <Link
                    to={`/project/${project.id}`}
                    className="rounded p-12 text-xl shadow-lg font-medium cursor-pointer hover:scale-110 hover:text-primary transition-all"
                    key={project.id}
                  >
                    {project.name}
                  </Link>
                ))}
              </>
            )}
          </ul>
        </main>
        {showRightSidebar && (
          <RightSidebar setShowRightSidebar={setShowRightSidebar}>
            <CreateProjectForm
              setShowRightSidebar={setShowRightSidebar}
              handleAfterClose={handleAfterClose}
            />
          </RightSidebar>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
