import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth.js';
import { todosRouter } from './routes/todos.js';
import dns from 'dns';
import { connectDB } from './config/db.js';

dns.setServers(['8.8.8.8']);


dotenv.config();
const app = express();

// hammasi uchun ruxsat beramiz
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/todos", todosRouter);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    } catch (error) {
        console.error("Serverni ishga tushirishda xatolik yuz berdi:", error);
        process.exit(1);
    }
}
startServer();