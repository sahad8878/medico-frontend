/* eslint-disable react/react-in-jsx-scope */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useSelector,useDispatch } from "react-redux";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { setLogout } from "../../Store/Slice/ClientSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function Dropdown() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
const {client} = useSelector((state) => state.clientLogin)

  const location = useLocation();
  const path = location.pathname;
  const handleLogout = () => {
    localStorage.removeItem("clientToken");
    dispatch(setLogout())
navigate("/")
  };

  if (
    path === "/clientProfile" ||
    path === "/login" ||
    path === "/doctor/doctorLogin" ||
    path === "/signup" ||
    path === "/doctor/doctorSignup"
  ) {
    var pathName = path;
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={`${
            path === pathName ? "text-[#194569]" : "text-white"
          }  inline-flex font-bold text-base uppercase w-full justify-center rounded-md  px-4 py-2  hover:text-[#194569] focus:outline-none`}
        >
          {client ? <span>Account</span> : <span>Login</span>}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 md:w-56 w-28  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {client ? (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link to="/clientProfile">
                    <span
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Profile
                    </span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <span
                    onClick={handleLogout}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Logout
                  </span>
                )}
              </Menu.Item>
            </div>
          ) : (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link to="/login">
                    <span
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Patient Login
                    </span>
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link to="/doctor/doctorLogin">
                    <span
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Doctor Login
                    </span>
                  </Link>
                )}
              </Menu.Item>
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
