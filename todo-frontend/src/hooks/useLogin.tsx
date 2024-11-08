import React, { useContext, useState } from "react";
import JwtService from "../apiServices/userServices";
import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { Toaster, toast } from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [response, setResp] = useState({});

  const login = async (email: string, password: string) => {
    <div>
      <Toaster />
    </div>;
    const isCorrect = handleInputError({ email, password });

    if (!isCorrect) return;
    setLoading(true);
    try {
      await JwtService.login({ email, password })
        .then((resp: any) => {
          // console.log("login response : ", resp);
          if (resp.success === true) {
            toast.success(resp.message);
            console.log("User Data From useLogin : ", resp);
            localStorage.setItem("auth", resp.token);
            localStorage.setItem("currentUser", `${JSON.stringify(resp.data)}`);
            setTimeout(() => {
              navigate("/myday");
            }, 3000);
          } else {
            toast.error(resp.message);
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
          }
        })
        .catch((err: any) => {
          console.log("Error in useLogin Hook : ", err);
          toast.error(err?.message);
        });
    } catch (error) {
      toast.error("Invalid Email Or Password");
    } finally {
      setLoading(false);
    }
  };

  <Toaster position="top-center" reverseOrder={false} />;
  return { login, loading };
};

export default useLogin;

interface stringInterface {
  email: string;
  password: string;
}
function handleInputError({ email, password }: stringInterface) {
  if (!email || !password) {
    toast.error("Please fill all details");
    return false;
  }

  if (password.toString().length < 4) {
    toast.error("Password must be atleast 6 characters");
    return false;
  }

  return true;
}
