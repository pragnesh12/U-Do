import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { StatusCode } from "../../Helpers/StatusCodes";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../../Middlewares/Auth";

const prisma = new PrismaClient();

interface userSchema {
  username: string;
  email: string;
  password: string;
}

export const login: RequestHandler = async (req, res, next): Promise<any> => {
  const data: userSchema = await req.body;

  if ((!data.email || !data.username) && !data.password) {
    res.status(StatusCode.BadRequest).json({
      success: false,
      message: "All Feilds Are Required",
    });
  }

  try {
    if (data) {
      let username: string | any = data.username;
      let email: string | any = data.email;
      const existingUser: object | any = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!existingUser) {
        return res.status(StatusCode.BadRequest).json({
          success: false,
          message: "User Not Found",
        });
      }
      console.log(!existingUser.isVerifiedEmail);

      if (existingUser.isVerifiedEmail === false) {
        return res.status(StatusCode.BadRequest).json({
          success: false,
          message: "Please Verify Your Email",
        });
      }

      bcrypt.compare(
        data.password,
        existingUser.password,
        async (err, result) => {
          console.log("Error: ", err);
          console.log("Password Match Result: ", result);

          if (err) {
            return res.status(500).send({
              success: false,
              message: "Something went wrong",
              err,
            });
          } else if (result) {
            const token = await setUser(existingUser);

            return res.status(200).send({
              success: true,
              message: "Login Successfull",
              token,
              data: {
                username: existingUser.username,
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
              },
            });
          } else {
            return res.status(500).send({
              success: false,
              message: "Invalid credentials provided",
            });
          }
        }
      );
    }
  } catch (error) {
    res.status(StatusCode.BadRequest).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export default login;
