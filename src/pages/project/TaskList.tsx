import { Children, FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import CreateTaskForm from "../../components/CreateTaskForm";
import RightSidebar from "../../components/RightSidebar";
import { useStore } from "../../hooks/store";
import { privateApi } from "../../services/api";

const TaskList: FC = () => {
  const {
    project: { id: projectId },
  } = useStore();

  const [showRightSidebar, setShowRightSidebar] = useState<boolean>(false);
  const [newTasks, setNewTasks] = useState<any[]>([]);

  const navigate = useNavigate();

  const {
    data: tasks,
    isLoading,
    dataUpdatedAt,
    refetch,
  } = useQuery("tasks", async () => {
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

        <main className="grid grid-cols-3 gap-8">
          <section className="space-y-4 bg-gray-50 p-8 shadow">
            <h3 className="font-head-bold text-xl font-bold">New tasks</h3>
            {newTasks.length > 0
              ? newTasks.map((task) => {
                  let bgColor = "bg-green-400";

                  switch (task.priority) {
                    case "CRITICAL":
                      bgColor = "bg-red-400";
                      break;
                    case "HIGH":
                      bgColor = "bg-orange-400";
                      break;
                    case "NORMAL":
                      bgColor = "bg-blue-400";
                      break;
                    default:
                      bgColor = "bg-green-400";
                      break;
                  }

                  return (
                    <div
                      className="bg-gray-100 p-3"
                      onClick={() => navigate(`../task/${task.id}`)}
                    >
                      <h4 className="py-2 font-head text-xl">{task.title}</h4>
                      <div className={`w-4 p-1 ${bgColor}`}></div>
                    </div>
                  );
                })
              : "No tasks present. Please create one"}
          </section>
        </main>
      </div>
      {showRightSidebar && (
        <RightSidebar
          setShowRightSidebar={setShowRightSidebar}
          showRightSidebar={showRightSidebar}
        >
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
