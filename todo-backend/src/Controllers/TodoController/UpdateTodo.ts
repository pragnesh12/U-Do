import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../../Helpers/StatusCodes";
import { v4 as uuidv4 } from "uuid";

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

    if (id) {
      // Update Todo
      const todo = await prisma.todo.update({
        where: {
          id: id, // ID of the Todo to update
        },
        data: {
          title: data.title,
          done: data.done,
          description: data.description,
        },
        include: {
          SubTodo: true, // Include SubTodos in the response
        },
      });

      return res.status(StatusCode.Accepted).json({
        success: true,
        message: "Todo Updated Successfully",
        Task: todo,
      });
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    return res.status(StatusCode.BadRequest).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
