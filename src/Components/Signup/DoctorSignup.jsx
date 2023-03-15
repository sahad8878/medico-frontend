/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Store/Slice/DoctorSlice";
import { message } from "antd";
import { InfinitySpin } from "react-loader-spinner";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/confic";
import axios from "../../Axios/Axios";

function DoctorSignup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [departments, setDepartments] = useState([]);

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    axios.get("/doctor/getdepartments").then((response) => {
      console.log(response.data);
      setDepartments(response.data.departments);
    });
  }, [refresh]);

  const validateFields = (data) => {
    let errors = {};

    // Validate fName
    if (!data.fName.trim()) {
      errors.fName = "First name is required";
    }

    // Validate lName
    if (!data.lName.trim()) {
      errors.lName = "Last name is required";
    }

    // Validate Specialization
    if (!data.specialization) {
      errors.specialization = "Specialization is required";
    }

    // Validate experience
    if (!data.experience) {
      errors.experience = "Experience is required";
    } else if (parseInt(data.experience) < 0) {
      errors.experience = "Experiance is invalid";
    }

    // location location
    if (!data.location) {
      errors.location = "Location is required";
    }

    // location licenceImg
    if (!data.licenceImg.name) {
      errors.licenceImg = "licence is required";
    }

    // Validate number
    if (!data.number) {
      errors.number = "Phone number is required";
    }

    // Validate email
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    // Validate password
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    // Validate confirmPassword
    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const handleSignup = async (event) => {
    event.preventDefault();

    let data = new FormData(event.currentTarget);
    data = {
      fName: data.get("fName"),
      lName: data.get("lName"),
      specialization: data.get("specialization"),
      experience: data.get("experience"),
      location: data.get("location"),
      number: data.get("number"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
      licenceImg: data.get("licenceImg"),
    };

    try {
      if (validateFields(data)) {
        setIsLoading(true);
        setError(null);
        if (data.licenceImg.name) {
          const date = Date.now();
          const rand = Math.random();
          const image = data.licenceImg;
          const imageRef = ref(
            storage,
            `/licenceImages/${date}${rand}_${image?.name}`
          );
          const toBase64 = (image) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            }).catch((err) => {
              console.log(err);
            });
          const imgBase = await toBase64(image);
          await uploadString(imageRef, imgBase, "data_url").then(async () => {
            const downloadURL = await getDownloadURL(imageRef);
            data.licenceImg = downloadURL;
          });
        } else {
          data.licenceImg = "";
        }

        axios.post("/auth/doctorSignup", data).then((response) => {
          const result = response.data;
          if (result.success) {
            localStorage.setItem("doctorToken", JSON.stringify(result));
            dispatch(
              setLogin({
                doctor: "doctor",
                name: result.doctorName,
                token: result.doctorToken,
              })
            );
            setIsLoading(false);
            message.success("Signup successfully!");
            navigate("/doctor/doctorPendingPage");
          } else {
            setIsLoading(false);
            setError(result.message);
            message.error(result.message).then(() => {
              setError(null);
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
      message.error("Somthing went wrong!");
    }
  };

  return (
    <div className="bg-[#EDF4FE]  w-screen flex justify-center px-4 ">
      <div className=" pl-5   w-[600px] mt-[170px] lg:mt-[240px] px-4">
        <h2 className=" text-3xl   font-mono font-bold">Start your career</h2>
        <p className="mb-10 text-[#1F6CD6] cursor-pointer">
          <Link to="/doctor/doctorLogin">Already have one? Log in</Link>
        </p>
        <form component="form" noValidate onSubmit={handleSignup}>
          <label
            className="block text-gray-700 font-medium mb-2 "
            htmlFor="name"
          >
            Name
          </label>
          <div className=" md:flex md:flex-row">
            <input
              className="bg-white p-2  w-full"
              type="text"
              id="fName"
              name="fName"
              placeholder="First Name"
            />
            <input
              className="bg-white p-2 w-full md:border-l mt-5 md:mt-0 md:border-l-black"
              type="text"
              id="lName"
              name="lName"
              placeholder="Last Name"
            />
          </div>
          {errors.fName && errors.lName ? (
            <span className="error text-red-400">
              fName and lName are required
            </span>
          ) : (
            <div>
              {errors.fName && (
                <span className="error text-red-400">{errors.fName}</span>
              )}
              {errors.lName && (
                <span className="error text-red-400"> {errors.lName}</span>
              )}
            </div>
          )}
          <div className="my-4">
            <label
              className="block text-gray-700 font-medium mb-2 "
              htmlFor="specialization"
            >
              Specialization
            </label>

            <select class="bg-white p-2  w-full" name="specialization">
              {departments.map((department) => (
                <option key={department._id}>{department.department}</option>
              ))}
            </select>
            {errors.specialization && (
              <span className="error text-red-400">
                {errors.specialization}
              </span>
            )}
          </div>
          <div className="mb-4   flex flex-row">
            <div className>
              <label
                className=" text-gray-700 font-medium mb-2 "
                htmlFor="experience"
              >
                Experience
              </label>
              <input
                className="bg-white p-2  w-full"
                type="text"
                id="experience"
                name="experience"
                placeholder="Experience"
              />
              {errors.experience && (
                <span className="error text-red-400">{errors.experience}</span>
              )}
            </div>
            <div className="sm:ml-20 ml-5 w-full sm:w-72 mt-1">
              <label
                className=" text-gray-700 font-medium mb-2 "
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="bg-white p-2   w-full"
                type="text"
                id="location"
                name="location"
                placeholder="Location"
                required
              />
              {errors.location && (
                <span className="error text-red-400">{errors.location}</span>
              )}
            </div>
          </div>
          <div className="mb-4 ">
            <label
              className="block text-gray-700 font-medium mb-2 "
              htmlFor="licenceImg"
            >
              Licence
            </label>
            <input
              className="bg-white p-2  w-full"
              type="file"
              id="licenceImg"
              name="licenceImg"
              placeholder="Add your licence Image"
            />
          </div>
          {errors.licenceImg && (
            <span className="error text-red-400">{errors.licenceImg}</span>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2 "
              htmlFor="number"
            >
              Phone
            </label>
            <input
              className="bg-white p-2  w-full"
              type="number"
              id="number"
              name="number"
              placeholder="Phone Number"
            />
            {errors.number && (
              <span className="error text-red-400">{errors.number}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2 "
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="bg-white p-2  w-full"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <span className="error text-red-400">{errors.email}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-black font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="bg-white p-2 w-full"
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
            />
            {errors.password && (
              <span className="error text-red-400">{errors.password}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-black font-medium mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              className="bg-white p-2 w-full"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Your Password"
            />
            {errors.confirmPassword && (
              <span className="error text-red-400">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          {error && (
            <div className="error text-center w-full p-2 bg-red-600 bg-opacity-30 text-red-500">
              {error}
            </div>
          )}
          {isLoading ? (
            <div className="mb-4 mt-10 flex justify-center ">
              <InfinitySpin width="200" color="#194569" />
            </div>
          ) : (
            <div className="mb-4 mt-10 flex justify-center">
              <input
                className="bg-white  hover:bg-[#194569] text-black font-medium py-2 px-20 sm:px-32 mb-20 rounded-lg"
                type="submit"
                value="Save and Continue"
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default DoctorSignup;
