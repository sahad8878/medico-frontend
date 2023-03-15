import React, { useState, useEffect } from "react";
import { message } from "antd";
import { InfinitySpin } from "react-loader-spinner";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/confic";
import SingleDepartment from "./SingleDepartment";
import axios from "../../Axios/Axios";

function AdminDepartment() {
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [departments, setDepartments] = useState([]);
  const [depImg, setDepImg] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [errors, setErrors] = useState({});

  const admin = JSON.parse(localStorage.getItem("adminToken"));
  const adminToken = admin.adminToken;
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/admin/getdepartments", { headers: { admintoken: adminToken } })
      .then((response) => {
        setDepartments(response.data.departments);
        setIsLoading(false);
      });
  }, [refresh]);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setDepImg(null);
  };
  const validateFields = (data) => {
    let errors = {};

    // Validate department
    if (!data.department) {
      errors.department = "Department is required";
    }

    // Validate description
    if (!data.description) {
      errors.description = "description is required";
    }

    // Validate departmentImg
    if (!data.departmentImg) {
      errors.departmentImg = "departmentImg is required";
    }

    setErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };
  const handleDepartments = async (event) => {
    event.preventDefault();

    let data = new FormData(event.currentTarget);
    data = {
      department: data.get("department"),
      description: data.get("description"),
      departmentImg: depImg,
    };

    try {
      if (validateFields(data)) {
        setError(null);
        setIsLoading(true);
        if (data.departmentImg.name) {
          const date = Date.now();
          const rand = Math.random();
          const departmentImg = data.departmentImg;
          const imageRef = ref(
            storage,
            `/departmentImages/${date}${rand}_${departmentImg?.name}`
          );
          const toBase64 = (departmentImg) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(departmentImg);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            }).catch((err) => {
              console.log(err);
            });
          const imgBase = await toBase64(departmentImg);
          await uploadString(imageRef, imgBase, "data_url").then(async () => {
            const downloadURL = await getDownloadURL(imageRef);
            data.departmentImg = downloadURL;
          });
        } else {
          data.departmentImg = null;
        }
        axios
          .post("/admin/postDepartments", data, {
            headers: { admintoken: adminToken },
          })
          .then((response) => {
            const result = response.data;
            if (result.success) {
              message.success("new department Added");
              setIsLoading(false);
              setDepImg(null);
              handleCloseModal();
              setRefresh(!refresh);
            } else {
              setError(result.message);
              setIsLoading(false);
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
    <>
      <div className=" p-6 sm:p-16 h-screen border-gray-200  pb-7 ">
        <h1 className="font-semibold pl-5 text-center sm:text-left mb-2 pb-9 font-serif text-2xl">
          Departments
        </h1>
        {isLoading ? (
          <div className=" flex justify-center">
            <InfinitySpin width="200" color="#194569" />
          </div>
        ) : (
          <div>
            {departments.length === 0 ? (
              <div className="">
                <div className="flex  justify-center  pt-28 font-serif text-[#194569] text-xl ">
                  Departments Not Exist...!
                </div>
                <div className="flex  justify-center">
                  <button
                    onClick={handleOpenModal}
                    className="bg-[#194569] text-center px-6 mt-6 rounded-lg py-1 text-white  font-medium  hover:bg-opacity-90 hover:text-black"
                  >
                    Add Department
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-center">
                  <button
                    onClick={handleOpenModal}
                    className="bg-[#194569] rounded-lg py-1 text-white px-11 font-medium lg:px-36 hover:bg-opacity-90 hover:text-black"
                  >
                    Add Department
                  </button>
                </div>
                <div className=" grid grid-cols-1 lg:grid-cols-2  gap-4 p-5 ">
                  {departments.map((department) => (
                    <SingleDepartment
                      department={department}
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Overlay modal */}
      {isOpen && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* Modal */}
            <div className="rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-md">
              <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3">
                <h2 className="text-lg text-center font-medium text-gray-900">
                  Add Department
                </h2>
              </div>
              <div className=" bg-[#EDF4FE]    px-4 pt-5 pb-4">
                <form component="form" onSubmit={handleDepartments}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-medium mb-2 "
                      htmlFor="department"
                    >
                      Department Name
                    </label>
                    <input
                      className="bg-white p-2 rounded-lg w-full"
                      type="text"
                      id="department"
                      name="department"
                      placeholder="Department Name"
                    />
                    {errors.department && (
                      <span className="error text-red-400">
                        {errors.department}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-medium mb-2 "
                      htmlFor="departmentImg"
                    >
                      Image
                    </label>
                    <div>
                      <img
                        src={depImg ? window.URL.createObjectURL(depImg) : null}
                        alt=""
                      />
                    </div>
                    <input
                      className="bg-white p-2 rounded-lg w-full"
                      type="file"
                      id="departmentImg"
                      name="departmentImg"
                      placeholder="Department Image"
                      onChange={(e) => {
                        setDepImg(e.target.files[0]);
                      }}
                    />
                    {errors.departmentImg && (
                      <span className="error text-red-400">
                        {errors.departmentImg}
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-black font-medium mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <textarea
                      className="bg-white p-2 rounded-lg w-full"
                      id="description"
                      name="description"
                      placeholder="Add Discription"
                    />
                    {errors.description && (
                      <span className="error text-red-400">
                        {errors.description}
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
                        className="bg-white  hover:bg-[#194569] text-black font-bold py-2 px-20 rounded-lg"
                        type="submit"
                        value="Continue"
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
      )}
    </>
  );
}

export default AdminDepartment;
