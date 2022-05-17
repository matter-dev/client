import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { privateApi } from "../services/api";
import { useStore } from "./store";

export default () => {
  const {
    project: { id: projectId },
  } = useStore();

  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false);
  const [newTasks, setNewTasks] = useState<any[]>([]);

  const {
    data: tasks,
    isLoading,
    dataUpdatedAt,
    refetch,
  } = useQuery(["tasks", projectId], async () => {
    const res = await privateApi.get("/api/v1/tasks", {
      params: {
        projectId,
      },
    });

    return res.data.result.tasks;
  });

  useEffect(() => {
    if (tasks)
      setNewTasks(() => tasks.filter((task: any) => task.status === "NEW"));
  }, [dataUpdatedAt]);

  const handleCreate = () => {
    setShowRightSidebar(true);
  };

  return {
    isLoading,
    handleCreate,
    newTasks,
    showRightSidebar,
    setShowRightSidebar,
    refetch,
  };
};
