import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import { FiChevronRight, FiChevronLeft, FiLogIn } from "react-icons/fi";
import Pagination from "@mui/material/Pagination";
import axios from "../../Axios/Axios";
import SingleDoctor from "./SingleDoctor";
import NoData from "../../Assets/NoData.png";

function DepartmentDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [feeFilter, setFeeFilter] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const client = JSON.parse(localStorage.getItem("clientToken"));
  const clientToken = client.clientToken;

  const { departmentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios
          .get(
            `/getDepartmentDoctors/${departmentId}/doctors?page=${currentPage}&limit=2&sortBy=${sortBy}&sortOrder=${sortOrder}&feeFilter=${feeFilter}&searchLocation=${searchLocation}`,
            { headers: { accesstoken: clientToken } }
          )
          .then((response) => {
            console.log(response);
            setDoctors(response.data.data);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [currentPage, sortBy, sortOrder, feeFilter, searchLocation]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleFeeFilterChange = (event) => {
    setFeeFilter(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchLocation(event.target.value);
  };

  return (
    <div className=" p-5 sm:p-20 pb-10">
      <div className="flex justify-center content-center mb-8">
        <h1 className="text-2xl font-serif font-semibold">Available Doctors</h1>
      </div>
      <div className="bg-[#D6E8EE] mb-11">
        {isLoading ? (
          <div className=" flex justify-center">
            <InfinitySpin width="200" color="#194569" />
          </div>
        ) : (
          <div>
            <div>
              <dir className="sm:px-36 pt-7 px-10 ">
                <div className="relative ">
                  <span className="absolute inset-y-0 left-0 flex items-center py-4">
                    <button
                      type="submit"
                      className="p-2 focus:outline-none focus:ring"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </span>
                  <input
                    name="Search"
                    type="text"
                    value={searchLocation}
                    onChange={handleSearchChange}
                    placeholder="Search Location..."
                    className="w-full py-2 pl-10 text-sm rounded-full focus:outline-none"
                  />
                </div>
              </dir>

              <div className=" sm:flex  ">
                <div className=" flex ml-28 flex-col space-y-4 mt-16 w-44">
                  <div className="flex flex-col">
                    <label
                      className="text-[#194569] font-medium"
                      htmlFor="sortBy"
                    >
                      Sort By:
                    </label>
                    <select
                      id="sortBy"
                      className="w-28"
                      value={sortBy}
                      onChange={handleSortChange}
                    >
                      <option value="createdAt">Date</option>
                      <option value="fee">Fee</option>
                      <option value="experience">Experience</option>
                    </select>
                  </div>
                  <div className="flex flex-col ">
                    <label
                      className="text-[#194569] font-medium"
                      htmlFor="sortOrder"
                    >
                      Order:
                    </label>
                    <select
                      id="sortOrder"
                      className="w-28"
                      value={sortOrder}
                      onChange={handleOrderChange}
                    >
                      <option value="desc">Descending</option>
                      <option value="asc">Ascending</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      className="text-[#194569] font-medium"
                      htmlFor="feeFilter"
                    >
                      Filter:
                    </label>
                    <input
                      id="feeFilter"
                      className="w-28"
                      placeholder="Enter Fee"
                      type="text"
                      value={feeFilter}
                      onChange={handleFeeFilterChange}
                    />
                  </div>
                </div>
                {doctors.length !== 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 sm:gap-20 p-6  mt-10 ">
                    {/*  */}

                    {doctors.map((doctor) => (
                      <Link to={`/doctorDetails/${doctor._id}`}>
                        <SingleDoctor doctor={doctor} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="ml-[20%] mt-14 flex justify-center content-center">
                    <div className="flex p-16 justify-center font-serif text-[#194569] text-xl">
                {" "}
                No Data..! Try again..
              </div>
                  </div>
                )}
              </div>
              <div className=" flex justify-center py-5 ">
                <div>
                  {totalPages !== 0 && (
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      variant="outlined"
                      shape="rounded"
                      color="primary"
                    />
                  )}
                </div>
                {/* <button
                onClick={handlePrevClick}
                disabled={page === 1}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronLeft />
              </button>
              {pages.map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageClick(pageNum)}
                  className={`p-2 m-1 rounded-full ${
                    page == pageNum ? "bg-[#194569] text-white" : "bg-white"
                  } `}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={handleNextClick}
                disabled={page === pages.length}
                className="p-2 m-2 rounded-full bg-white"
              >
                <FiChevronRight />
              </button> */}
              </div>
            </div>
            {/* )} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default DepartmentDoctors;
