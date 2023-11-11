// Imports
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// App
const app = express();

// DB Connection
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log("Database Connected Successfully");
	})
	.catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
	res.send("Project Working Fine !!!");
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});
