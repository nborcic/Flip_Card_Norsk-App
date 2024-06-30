import React from "react";
import IconButtonMenu from "./IconButtonMenu";

const Aboveall = () => {
  return (
    <div className=" h-[70px] border border-black rounded flex justify-between items-center m-2 p-2">
      <img
        src="https://placehold.co/50x50/png"
        className="rounded-xl ml-2"
        alt="userIcon"
      />
      <p className="font-mono font-bold text-xl">Flip To Know</p>

      <IconButtonMenu />
    </div>
  );
};

export default Aboveall;
