import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../../Helpers/StatusCodes";
import { Todo } from "../../Models/TodoModel";
import { v4 as uuidv4 } from "uuid";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export const insertTodo: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const data: Todo = req.body;
  const userId: any = Number(req.user?.id); // Assuming `req.user` contains the authenticated user's details

  console.log("Id : ", userId);
  const uuid = uuidv4();
  const uuidWithoutHyphens = uuid.replace(/-/g, "");
  try {
    if (!data.title) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Please! Provide Title For The Task",
      });
    }

    const todo = await prisma.todo.create({
      data: {
        id: uuidWithoutHyphens,
        title: data.title,
        done: data.done ? data.done : false,
        description: data.description,
        userId, // Assigning the authenticated user's ID
      },
    });

    console.log("Successfully Created A Todo");
    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "Todo Created Successfully",
      Task: todo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(StatusCode.BadRequest).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
