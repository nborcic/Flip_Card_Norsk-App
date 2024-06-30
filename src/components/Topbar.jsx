import * as React from "react";
import CustomCheckbox from "./CustomCheckbox";

const Topbar = () => {
  return (
    <div className=" h-[70px] border border-black rounded flex justify-center items-center m-2 p-2">
      <div className="flex items-center flex-col">
        <div className=" justify-between items-center ">
          <CustomCheckbox />
        </div>
        <div className="bg-black h-[10px] w-full"></div>
      </div>
    </div>
  );
};

export default Topbar;
