import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../../Helpers/StatusCodes";

const prisma = new PrismaClient();

export const deleteSubTodo: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const data: any = req.body;
  const id: any = req.query.id;

  try {
    if (!id) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Please! Provide Id For Deleting The Task",
      });
    }

    const deletedSubTodo = await prisma.subTodo.delete({
      where: {
        id: id,
      },
    });

    console.log("Successfully Deleted A SubTodo : ", deletedSubTodo);
    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "SubTodo Deleted Successfully",
      deleted: deletedSubTodo,
    });
  } catch (error) {
    console.error("Error deleting SubTodo:", error);
    return res.status(StatusCode.BadRequest).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
