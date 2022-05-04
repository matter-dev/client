import { FC, useEffect, useState } from "react";
import CreateProjectSider from "../components/CreateProjectSider";
import Logo from "../components/Logo";
import Sidebar from "../components/Sidebar";
import { privateApi } from "../services/api";

const Dashboard: FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [showCreateSider, setShowCreateSider] = useState<boolean>(false);
  const [refetch, setRefetch] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      const res = await privateApi.get("/api/v1/projects");
      setProjects(res.data.result.projects);
      setRefetch(false);
    };
    if (refetch) {
      getProjects();
    }
  }, [refetch]);

  const handleCreate = () => {
    setShowCreateSider(true);
  };

  const handleAfterClose = () => {
    setRefetch(true);
  };

  return (
    <div className="h-screen md:grid md:grid-cols-[20%_80%]">
      <aside>
        <Sidebar />
      </aside>

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
            {projects.map((project) => (
              <div
                className="rounded p-12 text-xl shadow-lg font-medium cursor-pointer hover:scale-110 transition-all"
                key={project.id}
              >
                {project.name}
              </div>
            ))}
          </ul>
        </main>
        {showCreateSider && (
          <CreateProjectSider
            setShowCreateSider={setShowCreateSider}
            handleAfterClose={handleAfterClose}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
