import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Register submitted:", form);
        try{
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            
            const data = await res.json();
            
            if(res.ok){
                console.log(data);
                navigate("/login");
            } else {
                setError(data.message);
            }
        }catch(err){
            console.log(err);
        }
        
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-md"
            >
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    🚀 Ro‘yxatdan o‘tish
                </h2>
                {error && <div className="text-red-500 mb-4 text-center font-bold">{error}</div>}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ism
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Ismingizni kiriting"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Email manzilingiz"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Parol
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-200"
                            placeholder="Parol kiriting"
                        />
                    </div>

                    {/* Submit */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                        Ro‘yxatdan o‘tish
                    </motion.button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-3 text-gray-500 text-sm">yoki</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Social login */}
                <div className="flex gap-3">
                    <button className="flex-1 py-3 px-4 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-50 transition">
                        <a href="https://google.com" className="text-gray-600 font-medium">Google</a>
                    </button>
                    <button className="flex-1 py-3 px-4 bg-white border border-gray-300 rounded-xl shadow hover:bg-gray-50 transition">
                        <a href="https://github.com" className="text-gray-600 font-medium">GitHub</a>
                    </button>
                </div>

                {/* Link */}
                <p className="text-center text-sm text-gray-700 mt-6">
                    Allaqachon akkaunt bormi?{" "}
                    <Link to="/login"
                        className="font-semibold text-indigo-600 hover:underline"
                    >
                        Kirish
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
