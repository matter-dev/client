import { FC, useState } from "react";
import { useQuery } from "react-query";
import CreateTaskForm from "../../components/CreateTaskForm";
import RightSidebar from "../../components/RightSidebar";
import { useStore } from "../../hooks/store";
import { privateApi } from "../../services/api";

const TaskList: FC = () => {
  const {
    project: { id: projectId },
  } = useStore();

  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false);

  const {
    data: tasks,
    isLoading,
    refetch,
  } = useQuery("tasks", async () => {
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
    setShowRightSidebar(true);
  };

  return (
    <>
      <div className="flex flex-col">
        <h1 className="font-head text-4xl">Your tasks</h1>
        <button
          className="my-8 w-max rounded bg-primary py-2 px-4 text-lg text-white"
          onClick={handleCreate}
        >
          Create task
        </button>
        {tasks.length > 0 ? (
          <table className="table-auto">
            <thead>
              <tr className="text-left text-xl text-primary">
                <th>#ID</th>
                <th>Title</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="grid grid-cols-4 text-lg">
              {tasks.map((task: any) => (
                <tr className="bg-purple-50 p-3">
                  <td>{task.id}</td>
                  <td>{task.title}</td>
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
      {showRightSidebar && (
        <RightSidebar setShowRightSidebar={setShowRightSidebar}>
          <CreateTaskForm
            setShowRightSidebar={setShowRightSidebar}
            handleAfterClose={refetch}
          />
        </RightSidebar>
      )}
    </>
  );
};

export default TaskList;
