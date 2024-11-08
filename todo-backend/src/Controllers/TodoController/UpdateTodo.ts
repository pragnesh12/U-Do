import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../../Helpers/StatusCodes";

const prisma = new PrismaClient();

export const updateTodo: RequestHandler = async (
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
        message: "Please! Provide Id For Updating The Task",
      });
    }

    const todo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        done: data.done,
        description: data.description,
      },
    });

    console.log("Successfully Created A Todo");
    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "Todo Updated Successfully",
      Task: todo,
    });
  } catch (error) {
    console.error("Error updataing todo:", error);
    return res.status(StatusCode.BadRequest).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
