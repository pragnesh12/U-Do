import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { StatusCode } from "../../Helpers/StatusCodes";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const getAllUsers: RequestHandler = async (req, res): Promise<any> => {
  try {
    const findAllUsers: any = await prisma.user.findMany({});

    if (!findAllUsers || findAllUsers.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "Users Founded Successfully",
      users: [findAllUsers],
    });
  } catch (error) {
    return res.status(StatusCode.Unauthorized).json({
      success: false,
      message: "Please Login Yourself!",
    });
  }
};

export default getAllUsers;
