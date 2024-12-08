import React from "react";
import { CgEditFlipH } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

export const initialData = {
  avatar: null,
  name: "",
  email: "",
  password: "",
};

const RegisterButMaybeBetter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend validation
    if (!formData.name || !formData.email || !formData.password) {
      alert("All fields are required");
      return;
    }
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }
    fetch("http://localhost:5050/api/users/register", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registration Successful");
          setFormData(initialData);
          navigate("/loginPage");
        } else {
          alert(data.message || "Registration Failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
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

      <form
        className="flex flex-col"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div>
          <h1>{formData.avatar ? "" : "Upload Avatar"}</h1>
          {formData.avatar ? (
            <div className="relative auto h-24 justify-center flex ">
              <img
                src={URL.createObjectURL(formData.avatar)}
                alt="Profile"
                className="rounded-xl object-cover hover:scale-105 transition-all"
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, avatar: null })}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
              >
                X
              </button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, avatar: e.target.files[0] })
                }
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              />
            </div>
          )}
        </div>

        <div className="pb-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-[#111827]"
          >
            Name
          </label>

          <div className="relative text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
              {/* User Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-user"
              >
                <path d="M20 21v-2a4 4 0 00-3-3.87" />
                <path d="M4 21v-2a4 4 0 013-3.87" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </span>

            <input
              type="text"
              maxLength={20}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              name="name"
              id="name"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
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
              {/* Mail Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="M22 7L12 13 2 7"></path>
              </svg>
            </span>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
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
              {/* Lock Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-lock"
              >
                <rect width="18" height="11" x="3" y="11" rx="2"></rect>
                <path d="M7 11V7a5 5 0 0110 0v4"></path>
              </svg>
            </span>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••••"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
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
            to="/loginPage"
            className="font-medium text-[#4F46E5] hover:underline hover:pointer"
          >
            Login
          </Link>
        </div>

        {/* ...Social media buttons... */}
      </form>
    </div>
  );
};

export default RegisterButMaybeBetter;
