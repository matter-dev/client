import type { FC } from "react";
import logoUrl from "../assets/images/logo.svg";

const Logo: FC = () => {
  return (
    <div className="logo flex items-center gap-2 font-head text-3xl">
      <img src={logoUrl} alt="matter logo" />
      matter
    </div>
  );
};

export default Logo;
