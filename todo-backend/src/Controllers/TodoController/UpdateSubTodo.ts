import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { StatusCode } from "../../Helpers/StatusCodes";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const updateSubTodo: RequestHandler = async (
  req: any,
  res: any,
  next
): Promise<any> => {
  const data: any = req.body;
  const id: any = req.query.id;

  try {
    if (id && !data.id) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Please! Provide Id For Updating The Task",
      });
    }

    // Perform the upsert logic for SubTodos manually based on subTitle
    // 1. Update existing SubTodos if provided

    // 2. Create new SubTodos if provided

    // 3. For uniquly identify each subTask

    if (data.id) {
      console.log("sub todo id : ", data.id);
      // Update SubTodo
      const subtodo = await prisma.subTodo.update({
        where: {
          id: data.id, // ID of the Todo to update
        },
        data: {
          subTitle: data.subTitle,
          subDone: data.subDone,
        },
      });
      return res.status(StatusCode.Accepted).json({
        success: true,
        message: "SubTodo Updated Successfully",
        subtodo: subtodo,
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
