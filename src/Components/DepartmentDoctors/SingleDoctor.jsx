import React from 'react'

function SingleDoctor({doctor}) {
  return (

    
    <div className="  rounded-t-3xl cursor-pointer   bg-gray-50 hover:shadow-2xl   hover:bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
    <div className="flex flex-col items-center  pb-3">
      {/* <img
        className="w-44 h-44 mb-3  rounded-t-3xl  shadow-lg"
        src={doctor.doctorImg
        }
        alt="Bonnie image"
      /> */}
      <input className='w-44 h-44 mb-3  rounded-t-3xl  shadow-lg' type="image" img src = {doctor.doctorImg} alt="photo" />
      <h5 className="mb-1 text-xl font-serif font-medium text-gray-900 dark:text-white">
        {doctor.fName} {doctor.lName}
      </h5>
      <span className="text-sm font-serif text-gray-600  dark:text-gray-400">
      <span>Experience:</span><span className='text-center font-serif text-gray-600 '> {doctor.experience}</span>
      </span>
      <span className="text-sm text-gray-500  dark:text-gray-400">
      <span className='font-serif text-gray-600 '>Cunsultation Fees:</span><span className='text-center font-serif text-gray-600 '> {doctor.consultationFees}</span>
      </span>
      <div className="flex mt-4 space-x-3 md:mt-6">
      
      <span className="text-sm font-serif text-gray-600  dark:text-gray-400">
        {doctor.specialization}
      </span>
      <span className="text-sm font-serif text-gray-600  dark:text-gray-400">
        {doctor.location}
      </span>

       {/* <a
        href="#"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        details
      </a> */}
        {/*
      <a
        href="#"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
      >
        Message
      </a> */}
      </div>
    </div>
  </div>
  )
}

export default SingleDoctor
