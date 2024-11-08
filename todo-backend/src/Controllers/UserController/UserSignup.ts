import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { User } from "../../Models/UserModel";
import bcrypt from "bcrypt";
import SendMail from "../../Helpers/SendMailer";
import jwt from "jsonwebtoken";
import { StatusCode } from "../../Helpers/StatusCodes";

const prisma = new PrismaClient();

export const signUp: RequestHandler = async (req, res, next): Promise<any> => {
  const data: User = await req.body;

  if (!data.username || !data.email || !data.password) {
    res.status(StatusCode.BadRequest).json({
      success: false,
      message: "All Feilds Are Required",
    });
  }

  try {
    if (data) {
      const userExisted: object | null = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
        select: {
          email: true,
        },
      });

      if (userExisted) {
        return res.status(StatusCode.BadRequest).json({
          success: "false",
          message: "You're Already Registered!",
        });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);

      const userRegisterd = await prisma.user.create({
        data: {
          username: data.username.toLowerCase(),
          email: data.email,
          password: hashedPassword,
          firstName: data.firstName,
          lastName: data.lastName,
          isVerifiedEmail: false,
        },
      });

      console.log("Successfully Registered : ", userRegisterd);

      const registerdUser: any = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      });

      // Generate email verification token
      const secretKey: any = process.env.ACCESS_TOKEN;
      const verificationToken = jwt.sign(
        { id: registerdUser.id, email: registerdUser.email }, // Using newUser.id here
        secretKey as string,
        { expiresIn: "365d" }
      );
      const verificationUrl = `${process.env.CORS_ALLOWED_URL}/verify_email/${verificationToken}`;

      // Send the verification email
      await SendMail(
        data.email,
        "Verify Your Email",
        `Hi, ${data.firstName}, please verify your email by clicking the link below: ${verificationUrl}`,
        `<h1>Hello, ${data.username}</h1> 
         <p>Thank you for registering! Please verify your email by clicking the link below:</p>
         <a href="${verificationUrl}">Verify Email</a>`
      );

      return res.status(StatusCode.Success).json({
        success: true,
        message:
          "User Registered Successfully, Please check your email to verify your account",
        data: {
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        },
      });
    }
  } catch (error) {
    console.log("Error At UserSignup : ", error);
  }
};
