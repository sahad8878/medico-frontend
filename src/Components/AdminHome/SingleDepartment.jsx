import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { message } from "antd";
import axios from "../../Axios/Axios";
import { InfinitySpin } from "react-loader-spinner";

import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/confic";

function SingleDepartment({ department, setRefresh, refresh }) {
  const [dropdown, setDropdown] = useState(false);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState(null);
  const [depImg, setDepImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(department.departmentImg);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setDepImg(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleCloseModal = () => {
    setModal(false);
  };

  const admin = JSON.parse(localStorage.getItem("adminToken"));
  const adminToken = admin.adminToken;
  function handleDelete(id) {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // TODO: Implement delete logic
        axios
          .delete(`/admin/deleteDepartment?id=${id}`, {
            headers: { admintoken: adminToken },
          })
          .then((response) => {
            if (response.data.success) {
              console.log(response.data, "response");
              message.success(response.data.message);
              setRefresh(!refresh);
            } else {
              message.error(response.data.message);
            }
          });

        Swal.fire("Deleted!", "Your data has been deleted.", "success");
        setDropdown(!dropdown);
      } else {
        setDropdown(!dropdown);
      }
    });
  }
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
    setErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };
  const editDepartment = async (event) => {
    event.preventDefault();

    let data = new FormData(event.currentTarget);
    data = {
      department: data.get("department"),
      description: data.get("description"),
      departmentImg: depImg,
      departmentId: department._id,
    };
    try {
      if (validateFields(data)) {
        setError(null);
        setIsLoading(true);
        if (data.departmentImg !== null) {
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
          data.departmentImg = department.departmentImg;
        }
        axios
          .put("/admin/putEditDepartment", data, {
            headers: { admintoken: adminToken },
          })
          .then((response) => {
            const result = response.data;
            if (result.success) {
              message.success(result.message);
              setIsLoading(false);
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
      <div
        key={department._id}
        className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
      >
        <div className=" max-h-screen md:w-[50%]">
          <div className=" inset-0 min-w-fit min-h-fit   flex items-center justify-center ">
            <img
              className="object-cover w-full rounded-t-lg   md:rounded-none md:rounded-l-lg"
              src={department.departmentImg}
              alt=""
            />
          </div>
        </div>
        <div className=" md:w-[50%]">
          <div className="flex flex-col justify-between text-center p-2 leading-normal">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {department.department}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {department.description}
            </p>
          </div>
        </div>
        <div className="">
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              className=" inline-flex items-center   justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              {/* vertical */}
              <svg
                class="w-6 h-6 hidden md:block "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
              </svg>
              <svg
                class="w-6 h-6 block md:hidden"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
              </svg>
            </button>

            {dropdown && (
              <div
                className={`   ${
                  dropdown ? "block" : "hidden"
                } absolute right-0  w-28 sm:w-36  origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <div
                  onClick={() => handleDelete(department._id)}
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <span className="block px-4 py-2 font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    Delete
                  </span>
                </div>
                <div
                  onClick={handleOpenModal}
                  className="py-1 border-t"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <span className="block px-4 py-2 font-bold text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                    Edit
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {modal && (
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
                  Update Department
                </h2>
              </div>
              <div className=" bg-[#EDF4FE]    px-4 pt-5 pb-4">
                <form component="form" onSubmit={editDepartment}>
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
                      defaultValue={department.department}
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
                      <img src={previewUrl} alt="" />
                    </div>

                    <input
                      className="bg-white p-2 rounded-lg w-full"
                      type="file"
                      id="departmentImg"
                      name="departmentImg"
                      placeholder="Department Image"
                      accept="image/*"
                      onChange={handleFileInputChange}
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
                      defaultValue={department.description}
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
        // Cardiologists, audiologists, dentists, ENT specialists, gynecologists, orthopedic surgeons, pediatricians, psychiatrists, veterinarians, radiologists, pulmonologists, endocrinologists, oncologists, neurologists, cardiothoracic surgeons,
      )}
    </>
  );
}

export default SingleDepartment;
