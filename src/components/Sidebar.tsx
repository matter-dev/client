import { FC } from "react";
import Logo from "./Logo";

const Sidebar: FC = () => {
  return (
    <div className="h-full bg-purple-900 text-white">
      <div className="p-8">
        <Logo />
      </div>
      <div className="">
        <ul>
          <li className="text-lg hover:bg-white hover:text-primary py-3 px-8 transition-all cursor-pointer hover:font-bold">
            Projects
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
