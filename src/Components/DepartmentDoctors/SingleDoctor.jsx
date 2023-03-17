import React from 'react'

function SingleDoctor({doctor}) {
  return (

    
    <div className="  sm:rounded-t-3xl cursor-pointer   bg-gray-50 hover:shadow-2xl   hover:bg-gray-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
    <div className="flex flex-col items-center  pb-3">
      <input className='w-44 h-44 mb-3 rounded-t-2xl sm:rounded-t-3xl  shadow-lg' type="image" img src = {doctor.doctorImg} alt="photo" />
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
      </div>
    </div>
  </div>
  )
}

export default SingleDoctor
