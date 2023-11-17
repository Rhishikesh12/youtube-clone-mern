import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
	const newVideo = new Video({ userId: req.user.id, ...req.body });
	try {
		const savedVideos = await newVideo.save();
		res.status(200).json(savedVideos);
	} catch (err) {
		next(err);
	}
};
