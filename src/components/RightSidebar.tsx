import type { FC, ReactNode } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const RightSidebar: FC<{
  setShowRightSidebar: any;
  children: ReactNode;
}> = ({ setShowRightSidebar, children }) => {
  return (
    <div className="absolute top-0 bottom-0 right-0 z-10 h-full w-[30%] bg-primary p-8 shadow-lg">
      <div>
        <AiOutlineCloseCircle
          className="ml-auto cursor-pointer text-3xl text-white"
          onClick={() => setShowRightSidebar(false)}
        />
        {children}
      </div>
    </div>
  );
};

export default RightSidebar;
