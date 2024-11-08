import express from "express";
import { signUp } from "../Controllers/UserController/UserSignup";
import login from "../Controllers/UserController/UserLogin";
import verifyEmail from "../Controllers/UserController/VerifyUser";
import getAllUsers from "../Controllers/UserController/GetAllUsers";
import { AuthCheck } from "../Middlewares/Auth";
import getCurrentUser from "../Controllers/UserController/GetCurrentUser";

const userRouter = express.Router();
console.log("User Router Called");

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.put("/verify_email", verifyEmail);
userRouter.get("/get-all-users", AuthCheck, getAllUsers);
userRouter.get("/get-user", getCurrentUser);

export default userRouter;
