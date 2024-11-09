import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Dashboard from "../components/DashboardComponents/Dashboard";
import { useNavigate } from "react-router-dom";
import JwtService from "../apiServices/userServices";
import { TodoContext, TodoProvider } from "../store/todoStore";

type Props = {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

const Home = () => {
  const [currentUser, setCurrentUser] = useState<Props | undefined>(undefined);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State for sidebar visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the auth token and user info when the component mounts
    (async () => {
      const itHasToken = localStorage.getItem("auth");
      if (!itHasToken) {
        navigate("/login");
      } else {
        try {
          const res = await JwtService.getCurrentUser();
          setCurrentUser(res.user);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          navigate("/login");
        }
      }
    })();

    // Function to handle screen resize
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarVisible(false); // Hide sidebar on small screens
      } else {
        setIsSidebarVisible(true); // Show sidebar on larger screens
      }
    };

    // Initial check for screen size
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [navigate]);

  return (
    <>
      <div className="flex !overflow-y-hidden overflow-x-hidden">
        {/* Conditionally render Sidebar on small screens */}
        <div className={`${!isSidebarVisible ? "block" : "hidden"} md:block`}>
          <Sidebar currentUser={currentUser} />
        </div>

        {/* Content area */}
        <div
          className={`flex-grow ${
            isSidebarVisible ? "mx-auto" : "ml-0"
          } md:ml-1 transition-all`}
        >
          <Dashboard currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default Home;
