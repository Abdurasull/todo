import Todo from "../models/Todo.js";
import { errorHandler, responseHandler } from "../utils/error.js";

export const todosController = {
    getTodos: async (req, res) => {
        try {
            const todos = await Todo.find({ userId: req.userId }).sort({ createdAt: -1 });
            
            return responseHandler({ status: 200, message: "Todos fetched successfully", data: todos }, res);
        } catch (err) {
            errorHandler(err, res);
        }
    },
    createTodo: async (req, res) => {
        try {
            const { text } = req.body;
            const todo = new Todo({ text, userId: req.userId });
            await todo.save();
            return responseHandler({ status: 201, message: "Todo created successfully", data: todo }, res);
        } catch (err) {
            errorHandler(err, res);
        }
    },
    updateTodo: async (req, res) => {
        try {
            const { id } = req.params;
            const { text, completed } = req.body;
            const todo = await Todo.findOneAndUpdate({ _id: id, userId: req.userId }, { text, completed }, { new: true });
            return responseHandler({ status: 200, message: "Todo updated successfully", data: todo }, res);
        } catch (err) {
            errorHandler(err, res);
        }
    },
    deleteTodo: async (req, res) => {
        try {
            const { id } = req.params;
            await Todo.findOneAndDelete({ _id: id, userId: req.userId });
            return responseHandler({ status: 200, message: "Todo deleted successfully", data: null }, res);
        } catch (err) {
            errorHandler(err, res);
        }
    }
}
