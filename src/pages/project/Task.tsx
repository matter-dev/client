import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { privateApi } from "../../services/api";

const Task: FC = () => {
  const { id: taskId } = useParams();

  const {
    data: task,
    isLoading,
    isError,
    dataUpdatedAt,
    refetch,
  } = useQuery("fetchTask", async () => {
    const res = await privateApi.get(`/api/v1/tasks/${taskId}`);

    return res.data.result?.task;
  });

  const [priority, setPriority] = useState("LOW");

  useEffect(() => {
    setPriority(task.priority);
  }, [dataUpdatedAt]);

  if (isError) {
    return (
      <div>
        Unable to fetch details. Please check task id or try again later
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setPriority(event.target.value);

    refetch();
  };

  return (
    <div>
      <h1 className="font-head-bold text-3xl font-bold hover:border hover:border-dashed hover:p-1">
        {task.title}
      </h1>
      <p>Last updated at: {new Date(task.updatedAt).toLocaleString()}</p>
      <div className="space-y-2">
        <label htmlFor="priority" className="font-bold">
          Priority
        </label>
        <select
          onChange={handleSelect}
          value={priority}
          name="priority"
          className="rounded p-2 outline-0"
        >
          <option value="LOW">Low</option>
          <option value="NORMAL">Normal</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
      </div>
      <p className="mt-8">{task.description}</p>
    </div>
  );
};

export default Task;
