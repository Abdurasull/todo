import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TodoApp({ token, onLogout }) {
    try{
        const [todos, setTodos] = useState([]);
        const [text, setText] = useState("");
        const base = `${import.meta.env.VITE_API_URL}/api/todos`;
        const navigate = useNavigate();

        useEffect(() => {
            const fetchTodos = async () => {
                try {
                    const res = await fetch(base, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    if (!res.ok) {
                        console.error("Failed to fetch todos");
                        navigate("/login");
                        return;
                    }

                    const data = await res.json();
                    setTodos(data.data || []); // faqat data.data ni olamiz
                } catch (err) {
                    console.error("Error fetching todos:", err);
                }
            };
            fetchTodos();
        }, [token]);


        const addTodo = async () => {
            if (!text.trim()) return;
            
            const res = await fetch(base, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ text }),
            });

            const result = await res.json();
            if (!res.ok) {
                console.error("Failed to fetch todos");
                navigate("/login");
                return;
            }
            
            const newTodo = result.data; // aniq bilamiz → data ichida

            setTodos([newTodo, ...todos]);
            setText("");
        };


        const toggle = async (id) => {
            const todo = todos.find((t) => t._id === id);
            if (!todo) return;

            const res = await fetch(`${base}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ completed: !todo.completed }),
            });

            if (!res.ok) {
                console.error("Failed to fetch todos");
                navigate("/login");
                return;
            }

            const result = await res.json();
            const updated = result.data; // aniq data.data bor

            setTodos(todos.map((t) => (t._id === id ? updated : t)));
        };


        const remove = async (id) => {
            await fetch(`${base}/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            setTodos(todos.filter((t) => t._id !== id));
        };


        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 flex flex-col items-center p-6">
                {/* Header */}
                <div className="w-full max-w-lg flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-white">✨ Your Todos</h2>
                    <button
                        onClick={onLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Input */}
                <div className="w-full max-w-lg flex gap-2 mb-6">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add a new todo..."
                        className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 shadow"
                    />
                    <button
                        onClick={addTodo}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition"
                    >
                        Add
                    </button>
                </div>

                {/* Todos list */}
                <ul className="w-full max-w-lg space-y-3">
                    {todos.map((todo) => (
                        <li
                            key={todo._id}
                            className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow hover:shadow-md transition"
                        >
                            <span
                                onClick={() => toggle(todo._id)}
                                className={`cursor-pointer text-lg ${todo.completed ? "line-through text-gray-400" : "text-gray-800"
                                    }`}
                            >
                                {todo.text}
                            </span>
                            <button
                                onClick={() => remove(todo._id)}
                                className="text-red-500 hover:text-red-700 transition"
                            >
                                ❌
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }catch(err){
        console.log(err);
    }   
}
