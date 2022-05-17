import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { privateApi } from "../../services/api";

interface TaskPriorityProps {
  refetch: any;
  id: number;
  priority: string;
  formFields: {
    priority: string;
  };
}

const TaskPriority: FC<TaskPriorityProps> = ({ formFields, id, refetch }) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: formFields,
  });

  const onSubmit: SubmitHandler<TaskPriorityProps["formFields"]> = async (
    values
  ) => {
    try {
      await privateApi.patch(`/api/v1/tasks/${id}`, values);
      toast.success("Priority updated");
      refetch();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form
      className="my-8 flex items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="priority" className="font-bold">
        Priority
      </label>
      <select {...register("priority")} className="">
        <option value="LOW">Low</option>
        <option value="NORMAL">Normal</option>
        <option value="HIGH">High</option>
        <option value="CRITICAL">Critical</option>
      </select>
      <button type="submit">
        <AiFillCheckCircle size={24} className="text-green-500" />
      </button>
    </form>
  );
};

export default TaskPriority;
