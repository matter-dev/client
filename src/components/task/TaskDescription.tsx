import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillCheckCircle } from "react-icons/ai";
import { toast } from "react-toastify";
import { privateApi } from "../../services/api";

interface TaskDescriptionProps {
  refetch: any;
  id: number;
  description: string;
  formFields: {
    description: string;
  };
}

const TaskDescription: FC<TaskDescriptionProps> = ({
  formFields,
  id,
  refetch,
}) => {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: formFields,
  });

  const onSubmit: SubmitHandler<TaskDescriptionProps["formFields"]> = async (
    values
  ) => {
    try {
      await privateApi.patch(`/api/v1/tasks/${id}`, values);
      toast.success("Description updated");
      refetch();
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea
        {...register("description")}
        className="border border-dashed p-1 text-lg"
      />
      <button type="submit">
        <AiFillCheckCircle size={24} className="text-green-500" />
      </button>
    </form>
  );
};

export default TaskDescription;
