import jwt from "jsonwebtoken";
import { StatusCode } from "../Helpers/StatusCodes";

export async function setUser(existingUser: any): Promise<any> {
  const secretkey: any = process.env.ACCESS_TOKEN;
  const expiresIn: string = "365d";
  let token = jwt.sign(
    { id: existingUser.id, email: existingUser.email },
    secretkey as string,
    {
      expiresIn,
    }
  );
  return token;
}

export async function AuthCheck(req: any, res: any, next: any): Promise<any> {
  try {
    const authorizationHeader = req.headers.authorization;

    // Check for missing authorization header
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      return res.status(StatusCode.Unauthorized).send({
        success: false,
        message: "Authorization header is missing or improperly formatted.",
      });
    }

    // Get token
    const VerifiedToken: string = authorizationHeader.split(" ")[1];
    // console.log("Token: ", parseInt(VerifiedToken));

    // Secret key for verification
    const secretKey: string = process.env.ACCESS_TOKEN as string;
    // console.log("Secret Key: ", secretKey);

    // Verify token
    const isVerifiedToken = jwt.verify(VerifiedToken, secretKey);
    // console.log("Result: ", isVerifiedToken);

    // If verification fails, handle accordingly
    if (!isVerifiedToken) {
      return res.status(StatusCode.Unauthorized).send({
        success: false,
        message: "Unauthorized! Please Login First",
      });
    }

    // Attach the decoded token data to the request for further use if needed
    req.user = isVerifiedToken;

    // Proceed to the next middleware
    next();
  } catch (error: any) {
    console.error("JWT Verification Error:", error.message);
    return res.status(StatusCode.Unauthorized).send({
      success: false,
      message: "Unauthorized! Invalid token.",
    });
  }
}
