import React, { useState } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import axios from "../../Axios/Axios";
import { setLogin } from "../../Store/Slice/AdminSlice";
function AdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    try {
      e.preventDefault();

      setIsLoading(true);
      setError(null);
      axios.post("/auth/admin", { email, password }).then((response) => {
        const result = response.data;
        if (result.success) {
          localStorage.setItem("adminToken", JSON.stringify(result));

          dispatch(
            setLogin({
              admin: "admin",
              adminEmail: result.AdminEmail,
              token: result.adminToken,
            })
          );
          message.success("Login  successfully!");
          navigate("/admin/adminHome");
        } else {
          setIsLoading(false);
          setError(result.message);
          message.error(result.message);
        }
      });
      // eslint-disable-next-line no-shadow
    } catch (error) {
      console.log(error);
      message.error("Somthing went wrong!");
    }
  };
  return (
    <div className="grid grid-cols-3">
      <div className="col-start-2 border border-black-300 shadow-xl mt-20 py-20 px-10 bg-white rounded-md">
        <div className="w-full  pb-12">
          <h1 className="text-black hover:underline font-mono text-2xl font-bold">
            Login
          </h1>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md block w-full border border-black-200 py-3 px-2 mb-5"
          />

          <input
            type="password"
            placeholder="Enter your Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-md block w-full border border-black-200 py-3 px-2 mb-5"
          />
          {error && <div className="error text-red-500">{error}</div>}
          {isLoading ? (
            <div className="flex justify-center">
              <InfinitySpin width="200" color="#194569" />
            </div>
          ) : (
            <button
              type="submit"
              className="block w-full bg-[#194569] hover:text-black text-white rounded-md py-3 px-2 mb-5"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
