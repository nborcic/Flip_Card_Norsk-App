import React from "react";
import IconButtonMenu from "./IconButtonMenu";

const Aboveall = () => {
  return (
    <div className=" h-[70px]  border border-black rounded flex justify-between items-center p-2 ">
      <img
        src="src/images/icon_navBar_noBack.webp"
        className="rounded-xl h-[50px] w-[50px]"
        alt="userIcon"
      />
      <p className="font-mono font-bold text-xl s:text-s">Flip To Know</p>

      <IconButtonMenu />
    </div>
  );
};

export default Aboveall;
