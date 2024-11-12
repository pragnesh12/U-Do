import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../../Helpers/StatusCodes";

const prisma = new PrismaClient();

export const fetchTodo: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const id: any = req.user.id;

  try {
    if (!id) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Unauthorized! Please Try To Login First",
      });
    }

    const todo = await prisma.todo.findMany({
      relationLoadStrategy: "join",
      where: {
        userId: Number(id),
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        SubTodo: {
          orderBy: {
            subTitle: "desc", // Order SubTodo items by createdAt in descending order
          },
        },
      },
    });

    console.log("Successfully Fetched A Todo");
    return res.status(StatusCode.Accepted).json({
      success: true,
      message: "Todo Fetched Successfully",
      Task: todo,
    });
  } catch (error) {
    console.error("Error fetching todo:", error);
    return res.status(StatusCode.BadRequest).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
