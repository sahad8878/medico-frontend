
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { message } from "antd";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../Axios/Axios";
import { setLogin } from "../../Store/Slice/DoctorSlice";

function DoctorLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setError(null);
      axios.post("/auth/doctorLogin", { email, password }).then((response) => {
        const result = response.data;
        if (result.success) {
          localStorage.setItem("doctorToken", JSON.stringify(result));
          dispatch(setLogin ({
            doctor:"doctor",
            name:result.doctorName,
            token:result.doctorToken
          }))
          setIsLoading(false);
          message.success("Login  successfully!");
          navigate("/doctor");
        } else {
          setIsLoading(false);
          setError(result.message);
          message.error(result.message).then(()=>{
            setError(null)
          })
        }
      });
    } catch (error) {
      console.log(error);
      message.error("Somthing went wrong!");
    }
  };
  return (
    <div className="bg-[#EDF4FE]  w-screen  flex justify-center">
      <div className="  w-[600px] mt-[170px] lg:mt-[230px] px-4 pb-10 lg:pb-20 ">
        <h2 className=" text-3xl   font-mono font-bold">Doctor Login</h2>
        <p className="mb-10 text-[#1F6CD6] cursor-pointer">
          <Link to="/doctor/doctorSignup">
            Create New Account? Signup
          </Link>
        </p>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2 "
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-white p-2 rounded-lg w-full"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-black font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-white p-2 rounded-lg w-full"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && (
          <div className="error text-center w-full p-2  bg-red-600 bg-opacity-30 text-red-500">
            {error}
          </div>
          )}
          {
            isLoading ? 
              <div className="mb-4 mt-10 flex justify-center " >
              
              <InfinitySpin width="200" color="#194569" />
            </div>
            :
                   <div className="mb-4 mt-10 flex content-center justify-center">
            <input
              className="bg-white  hover:bg-[#194569] text-black font-medium py-2
                 w-72  rounded-lg"
              type="submit"
              value="Continue"
            />
           </div>
          }
           

        </form>
      </div>
    </div>

    // <div className="w-full max-w-sm mx-auto">
    //   <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg pt-60 shadow-md">
    //     <div className="mb-4">
    //       <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
    //         Name
    //       </label>
    //       <input
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         id="name"
    //         type="text"
    //         name="name"
    //         value={setPassword}
    //         onChange={' '}
    //         required
    //       />
    //     </div>
    //     <div className="mb-6">
    //       <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
    //         Email
    //       </label>
    //       <input
    //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //         id="email"
    //         type="email"
    //         name="email"
    //         value={setEmail}
    //         onChange={' '}
    //         required
    //       />
    //     </div>
    //     <div className="flex items-center justify-end">
    //       <button
    //         className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
    //         type="submit"
    //       >
    //         Submit
    //       </button>
    //     </div>
    //   </form>
    // </div>
   
  );
}

export default DoctorLogin;
