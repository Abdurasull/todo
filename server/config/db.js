import mongoose  from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB ga ulanish muvaffaqiyatli amalga oshirildi");
    } catch (error) {
        console.error("MongoDB ga ulanishda xatolik yuz berdi:", error);
        process.exit(1); // Xatolik yuz berganda serverni to'xtatish
    }
}