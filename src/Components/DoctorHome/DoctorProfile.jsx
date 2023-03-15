import { message } from "antd";
import React, { useState, useEffect } from "react";
import axios from "../../Axios/Axios";
import { InfinitySpin } from "react-loader-spinner";

import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/confic";

function DoctorProfile() {
  const [Doctor, setDoctor] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState({});
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const doctor = JSON.parse(localStorage.getItem("doctorToken"));
  const doctorToken = doctor.doctorToken;
  useEffect(() => {
    const doctorId = doctor.doctorId;
    axios
      .get(`/doctor/getDoctorDetails/${doctorId}`, {
        headers: { doctortoken: doctorToken },
      })
      .then((response) => {
        if (response.data.success) {
          setDoctor(response.data.doctor);
        }
      });
  }, [refresh]);

  useEffect(() => {
    axios.get("/doctor/getdepartments").then((response) => {
      console.log(response.data);
      setDepartments(response.data.departments);
    });
  }, [refresh]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

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

    // Validate specialization
    if (!data.specialization) {
      errors.specialization = "Specialization is required";
    }

    // Validate experience
    if (!data.experience) {
      errors.experience = "experience is required";
    } else if (parseInt(data.experience) < 0) {
      errors.experience = "experience not valid";
    }

    // Validate location
    if (!data.location) {
      errors.location = "Location is required";
    }
    // gender address
    if (!data.address) {
      errors.address = "Address is required";
    }
    // Validate number
    if (!data.number) {
      errors.number = "Phone number is required";
    }

    // Validate education
    if (!data.education) {
      errors.education = "Education is required";
    }
    // Validate doctorImg
    if (!data.doctorImg) {
      errors.doctorImg = "Profile  is required";
    }

    // Validate consultationFees
    if (!data.consultationFees) {
      errors.consultationFees = "consultation Fees is required";
    } else if (data.consultationFees < 0) {
      errors.consultationFees = "consultation Fees not valid";
    }

    setErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };
  const handleUpdateClient = async (event) => {
    event.preventDefault();

    let data = new FormData(event.currentTarget);
    data = {
      fName: data.get("fName"),
      lName: data.get("lName"),
      specialization: data.get("specialization"),
      experience: data.get("experience"),
      location: data.get("location"),
      number: data.get("number"),
      education: data.get("education"),
      address: data.get("address"),
      doctorImg: data.get("doctorImg"),
      consultationFees: data.get("consultationFees"),
    };
    console.log(data, "dataaaaa");
    try {
      if (validateFields(data)) {
        setIsLoading(true);
        setError(null);
        if (data.doctorImg.name) {
          const dirs = Date.now();
          const rand = Math.random();
          const image = data.doctorImg;
          const imageRef = ref(
            storage,
            `/doctorImages/${dirs}${rand}_${image?.name}`
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
            data.doctorImg = downloadURL;
          });
        } else {
          if (Doctor.doctorImg) {
            data.doctorImg = Doctor.doctorImg;
          } else {
            data.doctorImg = "";
          }
        }

        axios
          .patch("/doctor/updateDoctorDetails", data, {
            headers: { doctortoken: doctorToken },
          })
          .then((response) => {
            const result = response.data;
            if (result.success) {
              setRefresh(!refresh);
              setIsLoading(false);
              message.success("Your details have been updated ");
              handleCloseModal();
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
    // <div className="bg-[#D6E8EE]  w-screen border-b-2 border-black ">
    <div className="">
      <div className=" flex justify-center ">
        <h1 className="text-center font-serif text-2xl font-semibold my-5 ">
          Details
        </h1>
      </div>
      <div className=" ">
        <div className="flex-col ">
          <div className="p-7 mt-2 block md:hidden ml-12 sm:ml-24  rounded-lg mx-2 h-72 w-64 shadow-xl">
            <img
              class="w-52 h-52 mb-3 rounded-full shadow-lg"
              src={Doctor.doctorImg}
              alt="Bonnie image"
            />
            <h1 className="text-center">
              {Doctor.fName} {Doctor.lName}
            </h1>
          </div>
          {/*  */}
          <div className="w-full  py-8 md:py-0 px-3">
            <div className="lg:w-[600px]  bg-[#EDF4FE] shadow-2xl pb-10 p-5 sm:p-10 ">
              <div className="mb-4 flex   ">
                <span className="block pr-6 text-gray-700 font-medium mb-2  text-center">
                  Specialization
                </span>
                <div className="bg-white bg-opacity-60 p-2  text-center sm:text-start w-full">
                  {Doctor.specialization}
                </div>
              </div>
              <div className="mb-4 flex ">
                <span className="block text-gray-700 text-center sm:text-start font-medium mb-2 pr-[50px]">
                  Education
                </span>
                <div className="bg-white bg-opacity-60 text-center sm:text-start p-2 w-full">
                  {Doctor.education}
                </div>
              </div>
              <div className="mb-4 flex ">
                <span className="block text-gray-700  text-center sm:text-start font-medium mb-2 pr-[44px]">
                  Experiance
                </span>
                <div className="bg-white text-center sm:text-start bg-opacity-60 p-2 w-full">
                  {Doctor.experience}
                </div>
              </div>
              <div className="mb-4 flex bg-opacity-60  ">
                <span className="block text-center sm:text-start text-gray-700  font-medium mb-2 pr-[60px]">
                  Location
                </span>
                <div className="bg-white text-center sm:text-start bg-opacity-60 p-2 w-full">
                  {Doctor.location}
                </div>
              </div>
              <div className="mb-4 flex ">
                <span className="block text-center sm:text-start text-gray-700  font-medium mb-2 pr-[61px]">
                  Address
                </span>
                <div className="bg-white text-center sm:text-start bg-opacity-60 p-2 w-full">
                  {Doctor.address}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleOpenModal}
                  className="px-8 bg-[#194569] rounded-md text-white"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed z-[1000] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal */}
            <div className="rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-md mt-3">
              <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3">
                <h2 className="text-lg text-center font-medium text-gray-900">
                  Edit Details
                </h2>
              </div>
              <div className=" bg-[#EDF4FE]    px-4 pt-5 pb-4">
                <form component="form" onSubmit={handleUpdateClient}>
                  <div className="md:flex">
                    <div className=" md:mr-4 mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="fName"
                      >
                        First Name
                      </label>
                      <input
                        className="bg-white p-2 rounded-lg w-full"
                        type="text"
                        id="fName"
                        name="fName"
                        defaultValue={Doctor.fName}
                      />
                      {errors.fName && (
                        <span className="error text-red-400">
                          {errors.fName}
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="lName"
                      >
                        Last Name
                      </label>
                      <input
                        className="bg-white p-2 rounded-lg w-full"
                        type="text"
                        id="lName"
                        name="lName"
                        placeholder="last  Name"
                        defaultValue={Doctor.lName}
                      />
                      {errors.lName && (
                        <span className="error text-red-400">
                          {errors.lName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="md:flex">
                    <div className=" md:mr-4 mb-4 md:w-6/12">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="specialization"
                      >
                        Specialization
                      </label>
                      <select
                        class="bg-white p-2 rounded-lg  w-full"
                        defaultValue={Doctor.specialization}
                        name="specialization"
                      >
                        {departments.map((department) => (
                          <option key={department._id}>
                            {department.department}
                          </option>
                        ))}
                      </select>
                      {errors.specialization && (
                        <span className="error text-red-400">
                          {errors.specialization}
                        </span>
                      )}
                    </div>
                    <div className="mb-4 md:w-6/12">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="education"
                      >
                        Education
                      </label>
                      <input
                        className="bg-white p-2 rounded-lg w-full"
                        type="text"
                        id="education"
                        name="education"
                        placeholder="Education"
                        defaultValue={Doctor.education}
                      />
                      {errors.education && (
                        <span className="error text-red-400">
                          {errors.education}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="md:flex">
                    <div className=" md:mr-4 mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="number"
                      >
                        Phone
                      </label>
                      <input
                        className="bg-white p-2 rounded-lg w-full"
                        type="number"
                        id="number"
                        name="number"
                        defaultValue={Doctor.number}
                      />
                      {errors.number && (
                        <span className="error text-red-400">
                          {errors.number}
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="location"
                      >
                        Location
                      </label>
                      <input
                        className="bg-white p-2 rounded-lg w-full"
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Location"
                        defaultValue={Doctor.location}
                      />
                      {errors.location && (
                        <span className="error text-red-400">
                          {errors.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="md:flex">
                    <div className=" md:mr-4 mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="experience"
                      >
                        Experience
                      </label>
                      <input
                        className="bg-white p-2 rounded-lg w-full"
                        type="text"
                        id="experience"
                        name="experience"
                        defaultValue={Doctor.experience}
                      />
                      {errors.experience && (
                        <span className="error text-red-400">
                          {errors.experience}
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <input
                        className="bg-white p-2 rounded-lg w-full"
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Address"
                        defaultValue={Doctor.address}
                      />
                      {errors.address && (
                        <span className="error text-red-400">
                          {errors.address}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="md:flex">
                    <div className=" md:mr-4 mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="consultationFees"
                      >
                        Consultation Fees
                      </label>
                      <input
                        className="bg-white p-2 rounded-lg w-full"
                        type="number"
                        id="consultationFees"
                        name="consultationFees"
                        defaultValue={Doctor.consultationFees}
                      />
                      {errors.consultationFees && (
                        <span className="error text-red-400">
                          {errors.consultationFees}
                        </span>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="doctorImg"
                      >
                        Image
                      </label>

                      <input
                        className="bg-white p-1 rounded-lg w-full"
                        type="file"
                        id="doctorImg"
                        name="doctorImg"
                        placeholder="doctorImg"
                      />
                      {errors.doctorImg && (
                        <span className="error text-red-400">
                          {errors.doctorImg}
                        </span>
                      )}
                    </div>
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
                        className="bg-white  hover:bg-[#194569] text-black font-medium py-2 px-14 sm:px-20 mb-20 rounded-lg"
                        type="submit"
                        value="Save and Continue"
                      />
                    </div>
                  )}
                </form>
              </div>

              <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#194569] text-base font-medium text-white hover:bg-opacity-70 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        // Cardiologists, audiologists, dentists, ENT specialists, gynecologists, orthopedic surgeons, pediatricians, psychiatrists, veterinarians, radiologists, pulmonologists, endocrinologists, oncologists, neurologists, cardiothoracic surgeons,
      )}
    </div>
  );
}

export default DoctorProfile;
