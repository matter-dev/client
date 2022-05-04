import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { privateApi } from "../services/api";

const CreateProjectSider: FC<{
  setShowCreateSider: any;
  handleAfterClose: any;
}> = ({ setShowCreateSider, handleAfterClose }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<{ name: string }> = async (values) => {
    await privateApi.post("/api/v1/projects", values);
    setShowCreateSider(false);
    handleAfterClose();
  };

  return (
    <div className="absolute top-0 bottom-0 shadow-lg z-10 right-0 h-full w-[30%] bg-primary p-8">
      <div>
        <AiOutlineCloseCircle
          className="ml-auto text-3xl text-white cursor-pointer"
          onClick={() => setShowCreateSider(false)}
        />

        <h1 className="text-white text-2xl font-bold">Project details</h1>

        <form className="my-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-white">
              Name
            </label>
            <input
              type="text"
              placeholder="Your project name"
              className="p-2 rounded bg-purple-700 outline-0 text-white"
              {...register("name", {
                required: "Name is required",
              })}
            />
          </div>
          <button
            type="submit"
            className="bg-white text-primary rounded py-2 px-4 font-bold shadow"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectSider;
