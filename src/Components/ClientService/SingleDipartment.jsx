import React from 'react'

function SingleDipartment({department}) {
  return (
    <div
      
      className="flex flex-col items-center mt-10 bg-[#E3E8EE] border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
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
     
    </div>
  )
}

export default SingleDipartment
