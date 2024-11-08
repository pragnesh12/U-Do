import React, { useState } from "react";
import JwtService from "../apiServices/userServices";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  interface Signup {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }

  const signup = async ({
    username,
    email,
    password,
    firstName,
    lastName,
  }: Signup) => {
    console.log({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    const isAnyError = handleInputError({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    if (!isAnyError) return;

    setLoading(true);
    try {
      await JwtService.signup({
        username,
        email,
        password,
        firstName,
        lastName,
      })
        .then((resp: any) => {
          console.log(resp.success);

          if (resp.success === false) {
            toast.error(resp.message);
          } else {
            toast("Varification Link Sended To Your Account");
            // setCurrentUserId(resp.data);
            if (resp.success === true) {
              setTimeout(() => {
                // window.location.reload();
                navigate("/login");
              }, 2000);
            }
          }
        })
        .catch((err: any) => {
          console.log("err");
          toast.error("Invalid server error");
        });
    } catch (error) {
      console.log("error occuring at useSignup : ", error);
    } finally {
      setLoading(false);
    }
  };
  <ToastContainer />;
  return { signup, loading };
};

export default useSignup;

// VALIDATION CHECKS :
function handleInputError({
  username,
  email,
  password,
  firstName,
  lastName,
}: any) {
  if (!username || !email || !password) {
    toast.error("Please fill all details");
    return false;
  }

  // if (password !== confirmpassword) {
  //   toast.error("Passwords not matched");
  //   return false;
  // }

  if (password < 6) {
    toast.error("Password must be atleast 6 characters");
    return false;
  }

  return true;
}
