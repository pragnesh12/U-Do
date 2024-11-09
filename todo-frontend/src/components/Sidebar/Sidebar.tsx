import React, { useContext, useEffect, useState } from "react";
import UserDropdown from "../UserProfile/UserDropdown";
import { NavLink } from "react-router-dom";
import TodoServices from "../../apiServices/todoServices";
import { TodoContext } from "../../store/todoStore";

interface CurrentUser {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

type SidebarProps = {
  currentUser?: CurrentUser; // Optional since it can be undefined initially
};

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [todoCount, setTodoCount] = useState([]);
  const [isCollapse, setIsCollapse] = useState(true);
  const [isShowBtn, setIsShowBtn] = useState(true);
  const [isSmallDevice, setIsSmallDevice] = useState(false);
  const [isPined, setIsPined] = useState(false);

  const todo = useContext(TodoContext);
  const toggleDropdown = () => {
    setShowDropdown((prev: any) => !prev);
  };

  const toggleCollapse = () => {
    if (!isPined) setIsCollapse((prev: any) => !prev);
    //
  };

  const toggleCollapseForSmallScreen = () => {
    setIsCollapse((prev: any) => !prev);
  };

  const toggleShow = () => {
    setIsPined((prev: any) => !prev);
    setIsShowBtn((prev: any) => !prev);
    console.log("-->", isShowBtn);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await TodoServices.fetchTodo().then((res: any) => {
          setTodoCount(res.Task);
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapse((prev: any) => !prev);
        setIsSmallDevice(true);
        setIsShowBtn((prev: any) => !prev); // Show button on small screens
      } else {
        setIsCollapse((prev: any) => !prev);
        setIsSmallDevice(false);
        setIsShowBtn((prev: any) => !prev);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on load

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isCollapse ? (
        <div
          className={`sm:w-[50rem] md:w-64 h-screen ${
            isSmallDevice && "sm:w-full"
          } bg-gray-900/80 text-white p-4 md:text-md text-[0.90rem]`}
          onMouseLeave={toggleCollapse}
        >
          <div className="flex items-center space-x-2 mb-6 cursor-pointer">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-2xl flex items-center justify-center">
              <span className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold">
                <NavLink to="/user-settings">
                  <img
                    src="https://tse1.mm.bing.net/th?id=OIP.zOGAknj6ivM3p2zbGwkDogHaHa&pid=Api&P=0&h=250" // Placeholder image URL
                    alt="User Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </NavLink>
              </span>
            </div>

            <div className="ml-2 flex relative ">
              <p className="justify-between " onClick={toggleDropdown}>
                <p className="font-semibold md:text-xl sm:text-sm">
                  {currentUser?.firstName}
                </p>
                {!isSmallDevice && (
                  <p className="text-sm text-gray-400">Free Plan</p>
                )}
              </p>

              {!isSmallDevice && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className={`text-[1rem] leading-10 absolute left-[9rem] mt-2 hover:text-blue-400 ${
                    isPined && "text-blue-400"
                  }`}
                  onClick={toggleShow}
                  // onMouseLeave={() => {
                  //   setIsShowBtn(false);
                  // }}
                >
                  <path
                    fill="currentColor"
                    d="M21.407 10.779a.8.8 0 0 1-1.131 1.131l-.19-.19-4.87 4.468-1.21 3.538a1 1 0 0 1-1.653.383l-3.391-3.39-3.677 3.677a.8.8 0 0 1-1.131-1.132l3.676-3.677-3.1-3.1a1 1 0 0 1 .39-1.655l3.552-1.189 4.446-4.892-.196-.195a.799.799 0 1 1 1.131-1.131l7.354 7.354zm-2.454-.192L14.25 5.884l-4.675 5.144-3.029 1.012 6.258 6.258 1.03-3.013 5.119-4.698z"
                  ></path>
                </svg>
              )}
            </div>
          </div>

          <ul className="ml-[-0.80rem] mt-[-0.80rem] font-semibold">
            <NavLink
              to="/myday"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : "hover:text-gray-700"
              }
            >
              <li className="flex items-center space-x-2 hover:bg-gray-800/90 p-[0.60rem] hover:rounded-md">
                <span className="md:text-md">🌅</span>
                <span className="ml-[1rem] md:text-[1.10rem] text-[11px]">
                  MyDay{" "}
                  <span className="bg-blue-600 text-white md:px-2 px-1 rounded-full md:text-[1rem] text-[0.70rem] md:ml-[0.10rem] ml-[0.1rem]">
                    {todoCount.length}
                  </span>
                </span>
              </li>
            </NavLink>

            <NavLink
              to="/next-7-days"
              className={({ isActive }) =>
                isActive ? "text-blue-400" : " hover:text-blue-300 "
              }
            >
              <li className="flex items-center space-x-2 p-[0.60rem] hover:rounded-md hover:bg-gray-800/90">
                <span>📅</span>
                <span className="ml-[1rem] md:text-[1.10rem] text-[11px]">
                  Next 7 days
                  <span className="text-gray-400 md:px-2 px-1 rounded-full md:text-[1rem] text-[0.70rem] md:ml-[0.10rem] ml-[0.1rem]">
                    4
                  </span>
                </span>
              </li>
            </NavLink>

            <NavLink
              to="/all-tasks"
              className={({ isActive }) =>
                isActive ? "text-blue-400 " : " hover:text-blue-300"
              }
            >
              <li className="flex items-center space-x-2 p-[0.60rem] hover:rounded-md hover:bg-gray-800/90">
                <span>📄</span>
                <span className="ml-[1rem] md:text-[1.10rem] text-[11px]">
                  All my tasks
                  <span className="text-gray-400 md:px-2 px-1 rounded-full md:text-[1rem] text-[0.70rem] md:ml-[0.10rem] ml-[0.1rem]">
                    4
                  </span>
                </span>
              </li>
            </NavLink>
          </ul>

          {showDropdown && <UserDropdown />}
          <div className="md:mt-6">
            <p className="text-gray-300 font-semibold text-[1rem] md:text-[1.50rem]">
              My lists {"📃"}
            </p>
            <ul className="space-y-3 md:mt-2 mt-1 text-gray-300 ml-[-0.50rem] md:text-[1.10rem] text-sm font-semibold">
              <NavLink
                to="/personal"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "hover:text-blue-300"
                }
              >
                <li className="flex items-center space-x-2 hover:rounded-md hover:bg-gray-800/90 p-[0.40rem] mb-[-1rem]">
                  <span>📂</span>
                  <span className="">
                    Personal
                    <span className="bg-blue-600 text-white md:px-2 px-1 rounded-full md:text-[1rem] text-[0.70rem] md:ml-1 ml-[0.2rem]">
                      3
                    </span>
                  </span>
                </li>
              </NavLink>
              <NavLink
                to="/work"
                className={({ isActive }) =>
                  isActive ? "text-blue-400" : "hover:text-blue-300"
                }
              >
                <li className="flex items-center space-x-2 p-[0.40rem] hover:rounded-md hover:bg-gray-800/90 mt-4">
                  <span>📂</span>
                  <span className="ml-1">Work</span>
                </li>
              </NavLink>
            </ul>
          </div>

          <div className="md:mt-6 mt-3">
            <p className="text-gray-300 font-semibold text-xl">Tags </p>
            <ul className="space-y-1 mt-1 text-yellow-400 hover:rounded-md hover:bg-gray-800/90 p-2 ml-[-0.30rem] text-md">
              <li>
                <NavLink
                  to="/priority"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "hover:text-yellow-500"
                  }
                >
                  #Priority
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        !isPined &&
        !isSmallDevice && (
          <div className="">
            <svg
              width="40px"
              height="40px"
              viewBox="0 -2 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="#000000"
              onMouseEnter={toggleCollapse}
              onClick={toggleCollapse}
              // onClic={toggleCollapse}
              className="ml-5 mt-7 bg-black p-2 cursor-pointer hover:bg-gray-900/50 rounded-full"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>align_text_distribute [#914]</title>{" "}
                <desc>Created with Sketch.</desc> <defs> </defs>{" "}
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  {" "}
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-300.000000, -4161.000000)"
                    fill="#ffffff"
                  >
                    {" "}
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      {" "}
                      <path
                        d="M244,4017 L264,4017 L264,4015 L244,4015 L244,4017 Z M244,4003 L264,4003 L264,4001 L244,4001 L244,4003 Z M244,4010 L264,4010 L264,4008 L244,4008 L244,4010 Z"
                        id="align_text_distribute-[#914]"
                      >
                        {" "}
                      </path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
        )
      )}
      {/* For Small Screens */}
      {isSmallDevice && (
        <div className="fixed top-[0.1rem] right-[1rem] z-50">
          <button
            onClick={toggleCollapseForSmallScreen}
            // className="bg-gray-900 text-white rounded-full hover:bg-gray-700 focus:outline-none"
          >
            <svg
              width="40px"
              height="40px"
              viewBox="0 -2 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              fill="blue"
              className="ml-5 mt-7 bg-gray-800 p-2 cursor-pointer hover:bg-gray-900/50 rounded-md"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <title>align_text_distribute [#914]</title>
                <desc>Created with Sketch.</desc>
                <defs></defs>
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-300.000000, -4161.000000)"
                    fill="#ffffff"
                  >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M244,4017 L264,4017 L264,4015 L244,4015 L244,4017 Z M244,4003 L264,4003 L264,4001 L244,4001 L244,4003 Z M244,4010 L264,4010 L264,4008 L244,4008 L244,4010 Z"
                        id="align_text_distribute-[#914]"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default Sidebar;
