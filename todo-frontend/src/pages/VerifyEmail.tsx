import React, { useEffect, useState } from "react";
import JwtService from "../apiServices/userServices";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { Toaster, toast } from "react-hot-toast";

const VerifyEmail = () => {
  let { token } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    (async () => {
      await JwtService.verifyEmail(token)
        .then((resp: any) => {
          console.log("Response : ", resp);
          if (resp) {
            setShow(true);

            toast.promise(
              new Promise((resolve: any) => {
                setTimeout(() => {
                  navigate("/login");
                  resolve();
                }, 5000);
              }),
              {
                loading: "Verifying...",
                success: <b>Verified!</b>,
                error: <b>Something Went Wrong.</b>,
              }
            );
          } else {
            setShow(false);
          }
        })
        .catch((err: any) => {
          setShow(false);
          console.log(err);
        });
    })();
  }, []);

  return (
    <>
      <Toaster />
      {show ? (
        <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default VerifyEmail;
