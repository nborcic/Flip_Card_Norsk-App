import React from "react";

const Notification = () => {
  return (
    <div className="rounded-lg w-[600px] h-32  bg-[#6586d4] text-[#ffffff]">
      <div className="flex flex-row w-full gap-5 justify-center items-center px-5 w-full h-full">
        <div className="my-auto text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-info"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
        </div>
        <div>
          <div className="font-bold text-2xl">Check your Inbox!</div>
          <div className="font-bold text-lg">
            Its easy, just answer the word in another language and click{" "}
            <i>NEXT</i>
            word
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
