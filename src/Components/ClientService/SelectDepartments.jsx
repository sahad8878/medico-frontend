import React, { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import axios from "../../Axios/Axios";
import SingleDipartment from "./SingleDipartment";

function SelectDepartments() {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getDepartment() {
      setIsLoading(true);
      const client = JSON.parse(localStorage.getItem("clientToken"));
      const clientToken = client.clientToken;

      await axios
        .get(`/getdepartments`, {
          headers: { accesstoken: clientToken },
        })
        .then((response) => {
          console.log(response, "res");
          setDepartments(response.data);
          setIsLoading(false);
        });
    }
    getDepartment();
  }, []);

  return (
    <div className="  bg-[#EDF4FE] py-14" id="myFirstComponent">
      <h1 className="font-bold text-center font-serif text-2xl ">
        Select departments
      </h1>
      <div className="">
        {isLoading ?
        
        (
          <div className=" flex justify-center">
            <InfinitySpin width="200" color="#194569" />
          </div>
        ) : (
          <div>
          {departments.length === 0 ?
        <div className="flex p-16 justify-center font-serif text-[#194569] text-xl"> Departments Not Exist..!</div>
        
          :
          <div
            id="content"
            className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6 p-5 "
          >
            {departments.map((department) => (
              <Link to={`/departmentDoctors/ ${department._id}`}>
                <SingleDipartment department={department} />
              </Link>
            ))}
          </div>

            }
            </div>
        )}
      </div>
    </div>
  );
}

export default SelectDepartments;
