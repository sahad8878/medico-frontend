import React,{useState} from 'react'
import { message,Modal } from 'antd';
import Moment from 'react-moment';

import axios from '../../Axios/Axios'


function SingleInbox({penDoctor,refresh,setRefresh}) {
    const [isOpen, setIsOpen] = useState(false);
    const admin = JSON.parse(localStorage.getItem('adminToken'));
    const adminToken = admin.adminToken
    const handleOpenModal = () => {
        setIsOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsOpen(false);
      };
    
    // accept appointment
      const acceptAppointment = (id) =>{
        Modal.confirm({
          title: 'Are you sure you want to Accept this Doctor requist?',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            axios.patch('/admin/acceptAppointment',{id} ,{headers:{'admintoken':adminToken}}).then((response) => {
              if(response.data.success){
                message.success(response.data.message)
                setRefresh(!refresh) 
              }else{
                message.error(response.data.message)
              }
            })
          },
          onCancel() {},
        });
    
       
      }
    
        // reject appointment requests

  const rejectAppointment = (id) =>{
    Modal.confirm({
      title: 'Are you sure you want to Reject this Doctor requist?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        axios.patch('/admin/rejectAppointment',{id} ,{headers:{'admintoken':adminToken}}).then((response) => {
          if(response.data.success){
            message.success(response.data.message)
            setRefresh(!refresh)
          }else{
            message.error(response.data.message)
          }
        })
      },
      onCancel() {},
    });

   
  }
  
  return (
    <tr key={penDoctor._id} className="">
    {/* <td className=" p-3 text-sm w-6 text-gray-700 ">
      <div className="h-10 w-10">
        <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
      </div>
    </td>  */}
    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {penDoctor.fName}
    </td>
    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {penDoctor.email}
    </td>
    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {penDoctor.number}
    </td>
    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {penDoctor.specialization}
    </td>
    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
        {penDoctor.location}
    </td>
    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
    <button onClick={handleOpenModal} className="p-1.5 text-xs font-medium uppercase tracking-wider text-white bg-[#194569] rounded-lg bg-opacity-80 hover:bg-opacity-50">Show</button>
               {/* Overlay modal */}
{isOpen && (
<div className="fixed z-50 inset-0 overflow-y-auto">
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
          Doctor Licence
        </h2>
      </div>
      <div className=" bg-[#EDF4FE]    px-4 pt-5 pb-4">
      <div className=" inset-0 min-w-fit min-h-fit   flex items-center justify-center ">
          <img
            className="object-cover w-full rounded-t-lg   md:rounded-none md:rounded-l-lg"
            src={penDoctor.licenceImg}
            alt=""
          />
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
    </td>
    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap">
      <Moment format='YYYY/MM/DD' >
        {penDoctor.createdAt}

      </Moment>
    </td>
    <td className=" p-3 text-sm text-gray-700 whitespace-nowrap cursor-pointer">

       <button onClick={()=>acceptAppointment(penDoctor._id)} className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-80 hover:bg-opacity-50">Accept</button>
       
    <button onClick={()=>rejectAppointment(penDoctor._id)} className="p-1.5 ml-5 text-xs font-medium uppercase tracking-wider text-red-600 bg-yellow-200 rounded-lg bg-opacity-80 hover:bg-opacity-50">Reject</button>
 
       
    </td>
  
  </tr>
  )
}

export default SingleInbox
