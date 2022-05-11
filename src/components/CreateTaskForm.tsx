import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useStore } from "../hooks/store";
import { privateApi } from "../services/api";

interface TaskFormValues {
  title: string;
  description: string;
  priority: "CRITICAL" | "HIGH" | "NORMAL" | "LOW";
}

const CreateTaskForm: FC<{
  setShowRightSidebar: any;
  handleAfterClose: any;
}> = ({ setShowRightSidebar, handleAfterClose }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      priority: "LOW",
    },
  });

  const project = useStore((state) => state.project);

  const onSubmit: SubmitHandler<TaskFormValues> = async (values) => {
    await privateApi.post("/api/v1/tasks", {
      ...values,
      projectId: project.id,
    });
    setShowRightSidebar(false);
    handleAfterClose();
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-white">Task details</h1>

      <form className="my-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="title" className="text-white">
            Title
          </label>
          <input
            type="text"
            placeholder="Your task name"
            className="rounded bg-purple-700 p-2 text-white outline-0"
            {...register("title", {
              required: "Title is required",
            })}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="description" className="text-white">
            Description
          </label>
          <textarea
            placeholder="Your task description"
            className="rounded bg-purple-700 p-2 text-white outline-0"
            {...register("description")}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="priority" className="text-white">
            Priority
          </label>
          <select
            defaultValue="LOW"
            {...register("priority")}
            className="rounded bg-purple-700 p-2 text-white outline-0"
          >
            <option value="LOW">Low</option>
            <option value="NORMAL">Normal</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded bg-white py-2 px-4 font-bold text-primary shadow"
        >
          Create
        </button>
      </form>
    </>
  );
};

export default CreateTaskForm;
