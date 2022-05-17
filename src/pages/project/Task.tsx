import type { FC } from "react";
import TaskTitle from "../../components/task/TaskTitle";
import useTask from "../../hooks/useTask";

const Task: FC = () => {
  const { handleSelect, isError, isLoading, priority, task, refetch } =
    useTask();

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
