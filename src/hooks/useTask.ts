import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { privateApi } from "../services/api";

export default () => {
  const { id: taskId } = useParams();
  const {
    data: task,
    isLoading,
    isError,
    dataUpdatedAt,
    refetch,
  } = useQuery(["fetchTask", taskId], async () => {
    const res = await privateApi.get(`/api/v1/tasks/${taskId}`);

    return res.data.result?.task;
  });

  const [priority, setPriority] = useState("LOW");

  useEffect(() => {
    if (task) {
      setPriority(task.priority);
    }
  }, [dataUpdatedAt]);

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setPriority(event.target.value);

    refetch();
  };

  return { isError, isLoading, task, refetch };
};
