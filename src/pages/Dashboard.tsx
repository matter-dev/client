import { FC, useEffect, useState } from "react";
import CreateProjectSider from "../components/CreateProjectSider";
import Logo from "../components/Logo";
import { privateApi } from "../services/api";

const Dashboard: FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [showCreateSider, setShowCreateSider] = useState<boolean>(false);

  useEffect(() => {
    const getProjects = async () => {
      const res = await privateApi.get("/api/v1/projects");
      setProjects(res.data.result.projects);
    };

    getProjects();
  }, []);

  const handleCreate = () => {
    setShowCreateSider(true);
  };

  return (
    <div className="w-2/3 mx-auto">
      <nav className="h-[80px] flex items-center">
        <Logo />
      </nav>
      <main className="py-8">
        <h1 className="text-4xl font-head">Your projects</h1>
        <button
          className="my-8 bg-primary text-white py-2 px-4 text-lg rounded"
          onClick={handleCreate}
        >
          Create new
        </button>
        <ul>
          {projects.map((project) => (
            <div>{project.name}</div>
          ))}
        </ul>
      </main>
      {showCreateSider && (
        <CreateProjectSider setShowCreateSider={setShowCreateSider} />
      )}
    </div>
  );
};

export default Dashboard;
