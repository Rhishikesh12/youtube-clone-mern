import express from "express";
import {} from "../controllers/video.controller.js";
const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo);

export default router;
