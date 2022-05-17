import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { privateApi } from "../../services/api";

interface TaskTitleProps {
  refetch: any;
  id: number;
  title: string;
  formFields: {
    title: string;
  };
}

const TaskTitle: FC<TaskTitleProps> = ({ formFields, id, refetch }) => {
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: formFields,
  });

  const title = watch("title");

  const onSubmit: SubmitHandler<TaskTitleProps["formFields"]> = async (
    values
  ) => {
    try {
      await privateApi.patch(`/api/v1/tasks/${id}`, values);
      toast.success("Title updated");
      refetch();
      setIsEditTitle(false);
    } catch (err) {
      toast.error("Something went wrong");
      setIsEditTitle(false);
    }
  };

  return isEditTitle ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("title", { required: "Title is required" })}
        className="border border-dashed p-1 font-head-bold text-3xl font-bold"
      />
    </form>
  ) : (
    <h1
      className="font-head-bold text-3xl font-bold hover:border hover:border-dashed hover:p-1"
      onClick={() => setIsEditTitle(true)}
    >
      {title}
    </h1>
  );
};

export default TaskTitle;
