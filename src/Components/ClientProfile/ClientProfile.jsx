import React, { useEffect, useState } from "react";
import profile from "../../Assets/user.png";
import axios from "../../Axios/Axios";
import Moment from "react-moment";
import { InfinitySpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { message } from "antd";

import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../../Firebase/confic";

function ClientProfile() {
  const [client, setClient] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [addressModal, setAddressModal] = useState(false);

  const clientloc = JSON.parse(localStorage.getItem("clientToken"));
  const clientToken = clientloc.clientToken;
  useEffect(() => {
    axios
      .get("/getClietProfile", { headers: { accesstoken: clientToken } })
      .then((response) => {
        console.log(response);
        setClient(response.data.client);
      });
  }, [refresh]);

  const handleOpenAddressModal = () => {
    setAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setAddressModal(false);
  };
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

    // Validate age
    if (!data.age) {
      errors.age = "Age is required";
    } else if (data.age < 0) {
      errors.age = "Age not valid";
    }

    // Validate number
    if (!data.number) {
      errors.number = "Phone number is required";
    }

    // Validate address
    if (!data.address) {
      errors.address = "Address is required";
    }

       // Validate clientImage
    if (!data.clientImage) {
      errors.clientImage = "profile image is required";
    }
    
    setErrors(errors);

    // Return true if there are no errors, false otherwise
    return Object.keys(errors).length === 0;
  };

  const handleUpdateAddress = async (event) => {
    event.preventDefault();
    
    let data = new FormData(event.currentTarget);
    data = {
      fName: data.get("fName"),
      lName: data.get("lName"),
      number: data.get("number"),
      address: data.get("address"),
      clientImage: data.get("clientImage"),
      age: data.get("age"),
    };


      try {
       if (validateFields(data)) { 
        setIsLoading(true);
    setError(null);
    if (data.clientImage.name) {
      const dirs = Date.now();
      const rand = Math.random();
      const image = data.clientImage;
      const imageRef = ref(
        storage,
        `/clientImages/${dirs}${rand}_${image?.name}`
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
        data.clientImage = downloadURL;
      });
    } else {
      if (client.clientImage) {
        data.clientImage = client.clientImage;
      } else {
        data.clientImage = "";
      }
    }

    axios
      .post("/updateClientDetails", data, {
        headers: { accesstoken: clientToken },
      })
      .then((response) => {
        const result = response.data;
        if (result.success) {
          setIsLoading(false);
          message.success("Your Details saved!");
          setRefresh(!refresh);
          handleCloseAddressModal();
        } else {
          setIsLoading(false);
          setError(result.msg);
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
      <div className=" p-5 sm:px-32 py-10 ">
        <div className="bg-[#D6E8EE] mb-11">
          <div className="flex justify-center content-center py-8">
            <h1 className="text-2xl font-serif  font-semibold">Profile</h1>
          </div>

          {/*  */}

          <div className="    pb-10  ">
            <div className="container mx-auto my-9 flex justify-center  ">
              <div className="flex flex-col md:flex-row">
                {/*  */}
                <div className="w-full  flex justify-center md:justify-end">
                  <div className="bg-[#EDF4FE]  ">
                    <div class="flex flex-col items-center p-5 pb-5">
                      {client.clientImage ? (
                        <img
                          class="w-52 h-52 mb-3 rounded-full shadow-lg"
                          src={client.clientImage}
                          alt="Bonnie image"
                        />
                      ) : (
                        <img
                          class="w-52 h-52 mb-3 rounded-full shadow-lg"
                          src={profile}
                          alt="Bonnie image"
                        />
                      )}
                      <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {client.fName} {client.lName}
                      </h5>
                      <span class="text-sm text-gray-500 dark:text-gray-400">
                        {client.email}
                      </span>
                    </div>
                    <div className=" flex my-5 ">
                      <button
                        onClick={handleOpenModal}
                        className="px-3 ml-8 bg-[#194569] text-white  hover:bg-opacity-60"
                      >
                        {" "}
                        Wallet
                      </button>
                      <Link to="/clientAppHistory">
                        <button className="bg-[#194569] text-white px-2 py-1 ml-3 hover:bg-opacity-60">
                          Appointments
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/*  */}
                <div className=" py-8 md:py-0 px-4">
                  <div className=" bg-[#EDF4FE] pb-10 p-5 sm:p-10 ">
                    <div className="mb-4 flex   ">
                      <span className="block pr-6 text-gray-700 font-medium mb-2  text-center">
                        Phone
                      </span>
                      <div className="bg-white bg-opacity-60 p-2  text-center sm:text-start w-full">
                        {client.number}
                      </div>
                    </div>
                    <div className="mb-4 flex ">
                      <span className="block text-gray-700 text-center sm:text-start font-medium mb-2 pr-10">
                        Dob
                      </span>
                      <div className="bg-white bg-opacity-60 text-center sm:text-start p-2 w-full">
                        <Moment format="YYYY/MM/DD">
                          {client.dateOfBirth}
                        </Moment>
                      </div>
                    </div>
                    <div className="mb-4 flex ">
                      <span className="block text-gray-700  text-center sm:text-start font-medium mb-2 pr-4">
                        Gender
                      </span>
                      <div className="bg-white text-center sm:text-start bg-opacity-60 p-2 w-full">
                        {client.sex}
                      </div>
                    </div>
                    <div className="mb-4 flex bg-opacity-60  ">
                      <span className="block text-center sm:text-start text-gray-700  font-medium mb-2 pr-10">
                        age
                      </span>
                      <div className="bg-white text-center sm:text-start bg-opacity-60 p-2 w-full">
                        {client.age}
                      </div>
                    </div>
                    <div className="mb-4 flex ">
                      <span className="block text-center sm:text-start text-gray-700  font-medium mb-2 pr-[11px]">
                        Address
                      </span>
                      <div className="bg-white text-center sm:text-start bg-opacity-60 p-2 w-full  ">
                        {client.address}
                      </div>
                    </div>
                    <div className=" flex justify-center mt-5">
                      <button
                        onClick={handleOpenAddressModal}
                        className=" bg-[#194569] text-white px-3 py-1 text-center hover:bg-opacity-75"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
      {isOpen && (
        <div className="fixed z-[1000] mt-10- inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 bg-opacity-70"></div>
            </div>

            {/* Modal */}
            <div className="rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-md">
              <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3">
                <h2 className="text-lg text-center font-medium text-gray-900">
                  Wallet Balance
                </h2>
              </div>
              <div className=" bg-[#EDF4FE]    px-4 pt-5 pb-4">
                <div className=" inset-0 min-w-fit min-h-fit   flex items-center justify-center ">
                  <h1>
                    Balance:
                    {client.wallet === 0
                    ?
                    <span className=" pl-2 text-red-500">No Balance</span>
                  :
                  <span className="pl-2 text-[#194569]">${client.wallet}</span>
                  
                  }
                  </h1>
                </div>
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

      {/* Address Modal */}
      {addressModal && (
        <div className="fixed z-[200] inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseAddressModal}
            >
              <div className="absolute inset-0 bg-gray-500 bg-opacity-70"></div>
            </div>

            {/* Modal */}
            <div className="rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:max-w-md">
              <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3">
                <h2 className="text-lg text-center font-medium text-gray-900">
                  update Your Details
                </h2>
              </div>
              <div className=" bg-[#EDF4FE]    px-4 pt-5 pb-4">
                <form component="form" onSubmit={handleUpdateAddress}>
                  {" "}  <div className="md:flex">
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
                        defaultValue={client.fName}
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
                        defaultValue={client.lName}
                      />
                      {errors.lName && (
                        <span className="error text-red-400">
                          {errors.lName}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-medium mb-2 "
                      htmlFor="number"
                    >
                      Phone Number
                    </label>

                    <input
                      className="bg-white p-2  w-full"
                      type="number"
                      id="number"
                      name="number"
                      defaultValue={client.number}        
                    />
                    {errors.number && (
                        <span className="error text-red-400">
                          {errors.number}
                        </span>
                      )}
                  </div>
                  <div className="flex">
                    <div className="mb-4">
                      <label
                        className="block text-black font-medium mb-2"
                        htmlFor="clientImage"
                      >
                        Profile Image
                      </label>
                      <input
                        className="bg-white p-1 rounded-lg w-full"
                        type="file"
                        id="clientImage"
                        name="clientImage"
                        placeholder="Add Your Profile Image"
                      />
                      {errors.clientImage && (
                        <span className="error text-red-400">
                          {errors.clientImage}
                        </span>
                      )}
                    </div>
                    <div className=" ml-4 mb-4">
                      <label
                        className="block text-gray-700 font-medium mb-2 "
                        htmlFor="department"
                      >
                        Age
                      </label>
                      <input
                        className="bg-white p-2   w-full"
                        type="number"
                        id="age"
                        name="age"
                        defaultValue={client.age}
                        placeholder="Age"
                      />
                      {errors.age && (
                        <span className="error text-red-400">
                          {errors.age}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-medium mb-2 "
                      htmlFor="address"
                    >
                      Address
                    </label>

                    <input
                      className="bg-white p-2  w-full"
                      type="text"
                      id="address"
                      name="address"
                      defaultValue={client.address}
                    />
                    {errors.address && (
                        <span className="error text-red-400">
                          {errors.address}
                        </span>
                      )}
                  </div>
                  {error && (
                    <div className="text-center error text-red-500 w-full bg-red-500 bg-opacity-50 ">
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
                        value="Update"
                      />
                    </div>
                  )}
                </form>
              </div>

              <div className="bg-[#EDF4FE] bg-opacity-70 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#194569] text-base font-medium text-white hover:bg-opacity-70 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCloseAddressModal}
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

export default ClientProfile;
