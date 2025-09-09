import express  from "express";
import auth from "../middleware/auth.js";
import { todosController } from "../controller/todosController.js";

export const todosRouter = express.Router();

todosRouter.get("/", auth, todosController.getTodos);
todosRouter.post("/", auth, todosController.createTodo);
todosRouter.put("/:id", auth, todosController.updateTodo);
todosRouter.delete("/:id", auth, todosController.deleteTodo);

