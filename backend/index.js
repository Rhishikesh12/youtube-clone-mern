// Imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import videoRoute from "./routes/videos.js";
import commentRoute from "./routes/comments.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

// App
const app = express();

// DB Connection
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("DB Connected!!");
	})
	.catch((err) => console.log(err));

// Routes
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/videos", videoRoute);
app.use("/api/comments", commentRoute);
app.use((err, req, res, next) => {
	const status = err.status || 500;
	const message = err.message || "something went wrong";
	return res.status(status).json({
		success: false,
		status,
		message,
	});
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`server running at port : ${PORT}`);
});
