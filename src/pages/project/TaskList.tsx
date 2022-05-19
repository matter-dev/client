import { Children, FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ReactSortable } from "react-sortablejs";
import { toast } from "react-toastify";
import { SortableEvent } from "sortablejs";
import CreateTaskForm from "../../components/CreateTaskForm";
import RightSidebar from "../../components/RightSidebar";
import { useStore } from "../../hooks/store";
import useTasks from "../../hooks/useTasks";
import { privateApi } from "../../services/api";

const TaskList: FC = () => {
  const {
    handleCreate,
    isLoading,
    newTasks,
    inProgressTasks,
    setShowRightSidebar,
    showRightSidebar,
    refetch,
    handleClick,
    setInProgressTasks,
    setNewTasks,
    doneTasks,
    setDoneTasks,
  } = useTasks();

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  const onAdd = async (id: string, status: string) => {
    try {
      await privateApi.patch(`/api/v1/tasks/${id}`, {
        status,
      });

      toast.success("Task status updated");
      refetch();
    } catch (err) {
      toast.error("Something went wrong");
    }
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
            {newTasks.length > 0 ? (
              <ReactSortable
                className="h-full space-y-3"
                list={newTasks}
                setList={setNewTasks}
                onAdd={(e) => onAdd(e.item.id, "NEW")}
                group={{
                  name: "tasks",
                  pull: true,
                  put: true,
                }}
                tag="div"
              >
                {newTasks.map((task) => {
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
                      onClick={() => handleClick(task.id)}
                      id={task.id}
                    >
                      <h4 className="py-2 font-head text-xl">{task.title}</h4>
                      <div className={`w-4 p-1 ${bgColor}`}></div>
                    </div>
                  );
                })}
              </ReactSortable>
            ) : (
              "No tasks present. Please create one"
            )}
          </section>
          <section
            className="space-y-4 bg-gray-50 p-8 shadow"
            id="inProgressList"
          >
            <h3 className="font-head-bold text-xl font-bold">
              Tasks in progress
            </h3>
            <ReactSortable
              className="h-full space-y-3"
              group={{
                name: "tasks",
                pull: true,
                put: true,
              }}
              tag="div"
              list={inProgressTasks}
              setList={setInProgressTasks}
              onAdd={(e) => onAdd(e.item.id, "IN_PROGRESS")}
            >
              {inProgressTasks.map((task) => {
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
                    onClick={() => handleClick(task.id)}
                    id={task.id}
                  >
                    <h4 className="py-2 font-head text-xl">{task.title}</h4>
                    <div className={`w-4 p-1 ${bgColor}`}></div>
                  </div>
                );
              })}
            </ReactSortable>
          </section>
          <section className="space-y-4 bg-gray-50 p-8 shadow">
            <h3 className="font-head-bold text-xl font-bold">Tasks done</h3>
            <ReactSortable
              className="h-full space-y-3"
              list={newTasks}
              setList={setNewTasks}
              group={{
                name: "tasks",
                pull: true,
                put: true,
              }}
              onAdd={(e) => onAdd(e.item.id, "COMPLETED")}
              tag="div"
            >
              {doneTasks.map((task) => {
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
                    onClick={() => handleClick(task.id)}
                    id={task.id}
                  >
                    <h4 className="py-2 font-head text-xl">{task.title}</h4>
                    <div className={`w-4 p-1 ${bgColor}`}></div>
                  </div>
                );
              })}
            </ReactSortable>
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
