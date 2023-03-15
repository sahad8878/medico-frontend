import React from 'react';

function TopNav() {
  return (
    <div  className="bg-[#D6E8EE] z-[200] top-0 flex flex-col md:flex-row  w-screen pb-3 min-w-screen fixed">
      <p className="pl-2 lg:pl-10">
        Email:Medico@gmail.com
      </p>
        <span className="ml-8 ">Phone:1234567890</span>

    </div>
  );
}

export default TopNav;
