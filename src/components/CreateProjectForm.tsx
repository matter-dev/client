import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { privateApi } from "../services/api";

const CreateProjectForm: FC<{
  setShowRightSidebar: any;
  handleAfterClose: any;
}> = ({ setShowRightSidebar: setShowRightSidebar, handleAfterClose }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<{ name: string }> = async (values) => {
    await privateApi.post("/api/v1/projects", values);
    setShowRightSidebar(false);
    handleAfterClose();
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-white">Project details</h1>

      <form className="my-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-white">
            Name
          </label>
          <input
            type="text"
            placeholder="Your project name"
            className="rounded bg-purple-700 p-2 text-white outline-0"
            {...register("name", {
              required: "Name is required",
            })}
          />
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

export default CreateProjectForm;
