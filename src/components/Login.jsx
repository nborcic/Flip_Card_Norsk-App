// Removed unused import
import React from "react";
import { CiLogin } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    fetch("http://localhost:5050/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())

      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          // console.log("Token:", data.token); Testing token

          navigate("/admin");
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setEmail("");
    setPassword("");
  };

  return (
    //fix buttons color at buttons
    //fix logo
    //login navigate to dashboard page
    //github twitter buttons
    //prepare for backend

    <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-white rounded-2xl shadow-xl !max-w-[900px]">
      <div className="flex flex-row gap-3 pb-4">
        <div>
          <CiLogin className="text-4xl text-blue" />
        </div>
        <h1 className="text-3xl font-bold text-[#4e8de5] my-auto">
          Flip Card Login
        </h1>
      </div>
      <div className="text-sm font-light text-[#143cdd] pb-8">
        Login to your account
      </div>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <div className="pb-2">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-[#8a4a11]"
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
                className="icon icon-mail"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
              placeholder="email@email.com"
              autoComplete="off"
              required
            />
          </div>
        </div>
        <div className="pb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-[#8a4a11]"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="••••••••••"
              className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 py-3 px-4"
              autoComplete="new-password"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full text-white bg-[#3eade9] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
        >
          Login
        </button>
        <button
          type="button"
          className="w-full text-grey-600 bg-gray-100  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <div className="text-sm font-light text-[#143cdd]">
          Don't have an account yet?{" "}
          <button
            type="button"
            className="font-medium text-[#3eade9] hover:underline"
            onClick={() => navigate("/Register")}
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="relative flex py-8 items-center">
        <div className="flex-grow border-t border-[1px] border-gray-200"></div>
        <span className="flex-shrink mx-4 font-medium text-gray-500">OR</span>
        <div className="flex-grow border-t border-[1px] border-gray-200"></div>
      </div>
      <form>
        <div className="flex flex-row gap-2 justify-center">
          <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-white">
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
              className="icon icon-github"
            ></svg>
          </button>
          <button className="flex flex-row w-32 gap-2 bg-gray-600 p-2 rounded-md text-white">
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
              className="icon icon-github"
            ></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
