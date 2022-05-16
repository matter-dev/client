import { useEffect, useState } from "react";
import { privateApi } from "../services/api";

export default () => {
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

  return {
    loading,
    projects,
    showRightSidebar,
    setShowRightSidebar,
    handleAfterClose,
    handleCreate,
  };
};
