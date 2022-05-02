import type { FC } from "react";
import logoUrl from "../assets/images/logo.svg";

const Logo: FC = () => {
  return (
    <div className="logo font-head flex items-center gap-2 text-3xl">
      <img src={logoUrl} alt="matter logo" />
      matter
    </div>
  );
};

export default Logo;
