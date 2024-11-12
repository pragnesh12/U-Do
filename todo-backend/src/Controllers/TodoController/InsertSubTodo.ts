import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../../Helpers/StatusCodes";
import { Todo } from "../../Models/TodoModel";
import { v4 as uuidv4 } from "uuid";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export const insertSubTodo: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const data: any = req.body;

  const uuid = uuidv4();
  const uuidWithoutHyphens = uuid.replace(/-/g, "");
  try {
    if (!data.subTitle) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Please! Provide Title For The SubTask",
      });
    }

    const subtodo = await prisma.subTodo.create({
      data: {
        id: uuidWithoutHyphens,
        subTitle: data.subTitle,
        subDone: data.subDone ? data.subDone : false,
        todoId: data.todoId, // Assigning the authenticated user's ID
      },
    });

    console.log("Successfully Created SubTodo");
    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "SubTodo Created Successfully",
      SubTask: subtodo,
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    return res.status(StatusCode.BadRequest).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
