import express from "express";
import { insertTodo } from "../Controllers/TodoController/InsertTodo";
import { AuthCheck } from "../Middlewares/Auth";
import { deleteTodo } from "../Controllers/TodoController/DeleteTodo";
import { updateTodo } from "../Controllers/TodoController/UpdateTodo";
import { fetchTodo } from "../Controllers/TodoController/FetchTodo";
import { fetchTodoById } from "../Controllers/TodoController/FetchTodoById";

const todoRouter = express.Router();

todoRouter.post("/myday-todo", AuthCheck, insertTodo);
todoRouter.delete("/delete-todo", AuthCheck, deleteTodo);
todoRouter.put("/update-todo", AuthCheck, updateTodo);
todoRouter.get("/fetch-todo", AuthCheck, fetchTodo);
todoRouter.get("/myday/tasks", AuthCheck, fetchTodoById);

export default todoRouter;
