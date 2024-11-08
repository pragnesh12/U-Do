import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const verifyEmail: RequestHandler = async (req, res): Promise<any> => {
  const userToken: any = req.query.token;
  const verifyToken: any = process.env.ACCESS_TOKEN;
  try {
    // Check if token is provided
    if (!userToken) {
      return res.status(400).json({
        success: false,
        message: "Token is missing.",
      });
    }

    // Verify the token and extract the user ID from it
    const decodedToken: any = jwt.verify(userToken, verifyToken);
    const userId = decodedToken.id; // Extract the userId from the decoded token payload

    console.log("User id: ", decodedToken.id);

    // Find the user based on the extracted userId
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User not found. Please register first.",
      });
    }

    // Update user to mark email as verified
    if (decodedToken) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isVerifiedEmail: true,
        },
      });
      return res.status(200).json({
        success: true,
        message: "Your email has been verified successfully.",
        user: {
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
        },
      });
    }
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        success: false,
        message: "Token has expired. Please request a new verification email.",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(400).json({
        success: false,
        message: "Invalid token.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "An error occurred during verification.",
    });
  }
};

export default verifyEmail;
