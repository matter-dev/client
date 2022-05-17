import type { FC } from "react";
import TaskDescription from "../../components/task/TaskDescription";
import TaskPriority from "../../components/task/TaskPriority";
import TaskTitle from "../../components/task/TaskTitle";
import useTask from "../../hooks/useTask";

const Task: FC = () => {
  const { isError, isLoading, task, refetch } = useTask();

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

  return (
    <div>
      <TaskTitle
        title={task.title}
        id={task.id}
        formFields={{ title: task.title }}
        refetch={refetch}
      />
      <p>Last updated at: {new Date(task.updatedAt).toLocaleString()}</p>
      <TaskPriority
        formFields={{ priority: task.priority }}
        id={task.id}
        priority={task.priority}
        refetch={refetch}
      />
      <TaskDescription
        description={task.description}
        formFields={{ description: task.description }}
        id={task.id}
        refetch={refetch}
      />
    </div>
  );
};

export default Task;
