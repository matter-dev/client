import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { privateApi } from "../services/api";
import { useStore } from "./store";

export default () => {
  const {
    project: { id: projectId },
  } = useStore();
  const navigate = useNavigate();
  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false);
  const [newTasks, setNewTasks] = useState<any[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<any[]>([]);
  const [doneTasks, setDoneTasks] = useState<any[]>([]);

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
  const handleClick = (id: number) => {
    navigate(`../task/${id}`);
  };

  useEffect(() => {
    if (tasks) {
      setNewTasks(() => tasks.filter((task: any) => task.status === "NEW"));
      setInProgressTasks(() =>
        tasks.filter((task: any) => task.status === "IN_PROGRESS")
      );
      setDoneTasks(() =>
        tasks.filter((task: any) => task.status === "COMPLETED")
      );
    }
  }, [dataUpdatedAt]);

  const handleCreate = () => {
    setShowRightSidebar(true);
  };

  return {
    isLoading,
    handleCreate,
    newTasks,
    inProgressTasks,
    showRightSidebar,
    setShowRightSidebar,
    refetch,
    navigate,
    handleClick,
    setNewTasks,
    setInProgressTasks,
    doneTasks,
    setDoneTasks,
  };
};
