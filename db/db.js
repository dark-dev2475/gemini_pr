import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";


function connect() {
    console.log("🔍 URI:", process.env.MONGODB_URI); // 👈 Add this

    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.error("❌ MongoDB connection error:", err));
}

export default connect;