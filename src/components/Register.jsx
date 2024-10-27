import React from "react";
import { CgEditFlipH } from "react-icons/cg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    //  frontend validation
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required.");
      return;
    }

    fetch("http://localhost:5050/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Registration Successful");
          navigate("/loginPage");
        } else {
          alert("Registration Failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred during registration.");
      });
  };

  return (
    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
      <div className="flex flex-row gap-3 pb-4">
        <div className="text-4xl font-bold text-[#4B5563] my-auto">
          <CgEditFlipH />
        </div>
        <h1 className="text-3xl font-bold text-[#4B5563] my-auto">
          Flip Card App
        </h1>
      </div>
      <div className="text-sm font-light text-[#6B7280] pb-8 ">
        Register for an account on Flip Card App
      </div>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <div className="pb-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-[#111827]"
          >
            Name
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              placeholder="Your Name"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="pb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-[#111827]"
          >
            Email
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value.toLowerCase(),
                })
              }
              id="email"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              placeholder="Your Email"
              autoComplete="off"
            />
          </div>
        </div>
        <div className="pb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-[#111827]"
          >
            Password
          </label>
          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-square-asterisk"
              >
                <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                <path d="M12 8v8"></path>
                <path d="m8.5 14 7-4"></path>
                <path d="m8.5 10 7 4"></path>
              </svg>
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              id="password"
              placeholder="••••••••••"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
              autoComplete="new-password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full text-[#FFFFFF] bg-[#4F46E5] hover:bg-[#36347a] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
        >
          Sign Up
        </button>
        <button
          type="button"
          className="w-full bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <div className="text-sm font-light text-[#6B7280] ">
          Already have an account?{" "}
          <Link
            onClick={() => navigate("/loginPage")}
            className="font-medium text-[#4F46E5] hover:underline hover:pointer"
          >
            Login
          </Link>
        </div>
      </form>
      <div className="relative flex py-8 items-center">
        <div className="flex-grow border-t border-[1px] border-gray-200"></div>{" "}
        <span className="flex-shrink mx-4 font-medium text-gray-500">OR</span>
        <div className="flex-grow border-t border-[1px] border-gray-200"></div>
      </div>
      <form>
        <div className="flex flex-row gap-2 justify-center">
          <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md hover:bg-[#26678b] text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-github"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
              <path d="M9 18c-4.51 2-5-2-7-2"></path>
            </svg>{" "}
            <span className="font-medium mx-auto">Github</span>
          </button>
          <button className="flex flex-row w-32 gap-2 bg-gray-600 hover:bg-[#26678b] p-2 rounded-md text-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-twitter"
            >
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>{" "}
            <span className="font-medium mx-auto">Twitter</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
