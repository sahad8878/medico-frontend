import React from "react";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="flex  justify-center h-screen bg-[#D6E8EE] items-center">
      <div className="  text-center space-y-4  ">
        <h1 className="text-7xl  text-shadow font-bold ">404</h1>
        <h1 className="uppercase text-2xl ">OPPS! Page not found</h1>
        <div className="cursor-pointer text-xl font-semibold hover:rounded-bl-full  rounded-tr-none hover:rounded-tr-full  rounded-bl-none border border-black  px-6 py-1   uppercase shadow-md shadow-slate-400">
          <Link to="/" className="">
            Go to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Error;
