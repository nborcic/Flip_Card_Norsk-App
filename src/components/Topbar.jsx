import CustomCheckbox from "./CustomCheckbox";

const Topbar = ({ setLevel }) => {
  return (
    <div className=" h-[70px]  border border-black bg-orange-100  rounded flex justify-center items-center  p-2">
      <div className="flex items-center flex-col">
        <div className=" justify-between items-center ">
          <CustomCheckbox setLevel={setLevel} />
        </div>
        <div className="bg-black h-[10px] w-full"></div>
      </div>
    </div>
  );
};

export default Topbar;
