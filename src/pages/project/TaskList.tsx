import type { FC } from "react";
import { useQuery } from "react-query";
import { useStore } from "../../hooks/store";
import { privateApi } from "../../services/api";

const TaskList: FC = () => {
  const {
    project: { id: projectId },
  } = useStore();

  const { data: tasks, isLoading } = useQuery("tasks", async () => {
    const res = await privateApi.get("/api/v1/tasks", {
      params: {
        projectId,
      },
    });

    return res.data.result.tasks;
  });

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  const handleCreate = () => {
    console.log("firsokt");
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl font-head">Your tasks</h1>
      <button
        className="my-8 bg-primary text-white py-2 px-4 text-lg rounded w-max"
        onClick={handleCreate}
      >
        Create task
      </button>
      {tasks.length > 0 ? (
        <table className="table-auto">
          <thead>
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: any) => (
              <tr>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No tasks present. Please create one"
      )}
    </div>
  );
};

export default TaskList;
