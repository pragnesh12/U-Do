import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import Loader from "../components/Loader/Loader";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [btn, setBtn] = useState(false);
  const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const { signup, loading } = useSignup();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "", 
    firstName:"",
    lastName: "",
  });


  type RecordType = Record<any,any>;

  type formErrors = RecordType;
  const [formErrors, setFormErrors] = useState({});

  const validateForm = (values:any) => {
    const error:Record<any,any> = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.fname) {
      error.fname = "First name is required";
    }
    if (!values.lname) {
      error.lname = "Last Name is required";
    }
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      error.password = "Password cannot exceed more than 10 characters";
    }
    return error;
  };

  const handleOnSubmit = (e:any) => {
    console.log("Your Data : ", inputs);
    e.preventDefault();
    setFormErrors(validateForm(inputs));
    console.log(validateForm(inputs));
    if (!inputs.firstName || !inputs.email || !inputs.password) {
      setBtn(true);
    }

    if (
      regex.test(inputs.email) &&
      inputs.password.length > 3 &&
      inputs.firstName.length > 2 &&
      inputs.lastName.length > 2
    ) {
      setBtn(false);
    }
    if (
      !btn &&
      inputs.email &&
      inputs.password.length > 3 &&
      regex.test(inputs.email)
    ) {
      (async () => {
        await signup(inputs);
        // toast.warning("Please Varify Your Email..");
      })();
    }
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="grid place-items-center mx-2 my-20 sm:my-auto">
          <div
            className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
            px-6 py-10 sm:px-10 sm:py-6 
            bg-white rounded-lg shadow-md lg:shadow-lg"
          >
            <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
              Signup
            </h2>

            <form
              className="mt-10"
              // encType="multipart/form-data"
              onSubmit={handleOnSubmit}
            >
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-600 uppercase"
              >
                Username <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="username"
                className="block w-full py-3 px-1 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                value={inputs.username}
                onChange={(e) => {
                  setInputs({ ...inputs, username: e.target.value });
                }}
              />
              {/* {!inputs.username && (
                // <p className="text-red-500">{formErrors.username}</p>
              )} */}  
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-600 uppercase mt-2"
              >
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="text"
                name="email"
                placeholder="e-mail address"
                className="block w-full py-3 px-1 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                value={inputs.email}
                onChange={(e) => {
                  setInputs({ ...inputs, email: e.target.value });
                  // formErrors.email = "";
                }}
              />
              {/* {!inputs.email && (
                <p className="text-red-500">{formErrors.email}</p>
              )}
              {!regex.test(inputs.email) && inputs.email && (
                <p className="text-red-500">{formErrors.email}</p>
              )} */}
              <label
                htmlFor="password"
                className="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  name="password"
                  placeholder="password"
                  className="block w-full py-3 px-1 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                  value={inputs.password}
                  onChange={(e) => {
                    setInputs({ ...inputs, password: e.target.value });
                    // formErrors.password = "";
                  }}
                />
                {/* {!inputs.password && (
                  <p className="text-red-500 mb-4">{formErrors.password}</p>
                )}
                {inputs.password && inputs.password.length < 4 && (
                  <p className="text-red-500 mb-4">{formErrors.password}</p>
                )} */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Toggle the state
                  className="absolute right-3 top-3 text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"} {/* Text based on state */}
                </button>
              </div>
              <label
                htmlFor="firstname"
                className="block text-xs font-semibold text-gray-600 uppercase mt-2"
              >
                First Name 
                
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First Name"
                className="block w-full py-3 px-1
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                value={inputs.firstName}
                onChange={(e) => {
                  setInputs({ ...inputs, firstName: e.target.value });
                }}
              />
              {/* {!inputs.firstName && (
                // <p className="text-red-500">{formErrors.fname}</p>
              )} */}
              <label
                htmlFor="lastname"
                className="block text-xs font-semibold text-gray-600 uppercase mt-2"
              >
                Last name 
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="block w-full py-3 px-1 
                    text-gray-800 appearance-none 
                    border-b-2 border-gray-100
                    focus:text-gray-500 focus:outline-none focus:border-gray-200"
                value={inputs.lastName}
                onChange={(e) => {
                  setInputs({ ...inputs, lastName: e.target.value });
                }}
              />
              {/* {!inputs.lastName && (
                <p className="text-red-500">{formErrors.lname}</p>
              )} */}

              <button
                type="submit"
                className={`w-full py-3 mt-10 bg-blue-500 rounded-sm
                    font-medium text-white uppercase
                    focus:outline-none hover:bg-blue-400 hover:shadow-none ${
                      btn && "cursor-not-allowed"
                    }`}
                // disabled={btn}
              >
                {loading ? <Loader /> : "Signup"}
              </button>
              <NavLink to="/login">
                <button
                  type="button"
                  className="w-full py-3 mt-2 bg-white-300 rounded-sm
                    font-medium text-black uppercase border-2
                    focus:outline-none hover:bg-white-100 hover:shadow-none"
                >
                  Login
                </button>
              </NavLink>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
