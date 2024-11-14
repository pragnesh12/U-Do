import express from "express";
import { insertTodo } from "../Controllers/TodoController/InsertTodo";
import { AuthCheck } from "../Middlewares/Auth";
import { deleteTodo } from "../Controllers/TodoController/DeleteTodo";
import { updateTodo } from "../Controllers/TodoController/UpdateTodo";
import { fetchTodo } from "../Controllers/TodoController/FetchTodo";
import { fetchTodoById } from "../Controllers/TodoController/FetchTodoById";
import { updateSubTodo } from "../Controllers/TodoController/UpdateSubTodo";
import { insertSubTodo } from "../Controllers/TodoController/InsertSubTodo";
import { deleteSubTodo } from "../Controllers/TodoController/DeleteSubTodo";

const todoRouter = express.Router();

todoRouter.post("/myday-todo", AuthCheck, insertTodo);
todoRouter.post("/myday-subtodos", AuthCheck, insertSubTodo);
todoRouter.delete("/delete-todo", AuthCheck, deleteTodo);
todoRouter.delete("/delete-subtodo", AuthCheck, deleteSubTodo);
todoRouter.put("/update-todo", AuthCheck, updateTodo);
todoRouter.put("/update-sub-todo", AuthCheck, updateSubTodo);
todoRouter.get("/fetch-todo", AuthCheck, fetchTodo);
todoRouter.get("/myday/tasks", AuthCheck, fetchTodoById);

export default todoRouter;
