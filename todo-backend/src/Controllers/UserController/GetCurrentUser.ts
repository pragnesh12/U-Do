import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { StatusCode } from "../../Helpers/StatusCodes";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const getCurrentUser: RequestHandler = async (
  req: any,
  res: any
): Promise<any> => {
  try {
    // Parse `id` from `req.query`, ensuring it's a number
    // // const id = parseInt(req.query.id as string, 10);
    // console.log(req.headers);
    const VerifiedToken = await req.headers.authorization.split(" ")[1];
    const secretKey: any = process.env.ACCESS_TOKEN;
    const isVerifiedToken: any = jwt.verify(VerifiedToken, secretKey);

    // if (isNaN(id) || isNaN(isVerifiedToken.id)) {
    //   return res.status(StatusCode.BadRequest).json({
    //     success: false,
    //     message: "Invalid ID Provided",
    //   });
    // }

    const currentUser = await prisma.user.findUnique({
      where: { id: isVerifiedToken.id },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!currentUser) {
      return res.status(StatusCode.NotFound).json({
        success: false,
        message: "User Not Found",
      });
    }

    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "User Data Found Successfully",
      user: currentUser,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(StatusCode.InternalServerError).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default getCurrentUser;
