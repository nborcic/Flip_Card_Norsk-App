import React from "react";
import { Link } from "react-router-dom";
  
const ErrorPage = () => {
  return (
    <div className="text-center flex flex-col gap-5">
      <h1 className="text-5xl"> Error 404</h1>
      <p className="text-5xl">Page Not Found</p>

      <Link
        to="/"
        className="text-blue-500  hover:text-blue-800  hover:cursor-pointer    hover:underline     
      transition-colors  text-5xl     duration-300      ease-in-out      hover:bg-blue-100    
      p-2      rounded-md      my-4      
          bg-blue-200           text-center      font-bold      focus:outline-none      focus:ring-2      focus:ring-blue-600      focus:ring-opacity-50      focus:ring-offset-2      focus:ring-offset-blue-200      focus:ring-offset-opacity-50      focus:ring-offset-offset-blue-200      focus:ring-offset-offset-opacity-50
      "
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
