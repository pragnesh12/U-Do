import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../../Helpers/StatusCodes";

const prisma = new PrismaClient();

export const deleteTodo: RequestHandler = async (
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

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    console.log("Successfully Deleted A Todo : ", deletedTodo);
    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "Todo Deleted Successfully",
      deleted: deletedTodo,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res.status(StatusCode.BadRequest).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
