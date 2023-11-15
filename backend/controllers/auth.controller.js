import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/User.model.js";
import { createError } from "../error.js";
dotenv.config();

const generateAccessToken = (userId) => {
	return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
};

export const signup = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new User({ ...req.body, password: hash });

		await newUser.save();
		res.status(200).send("User has been created!");
	} catch (error) {
		next(error);
	}
};

export const signin = async (req, res, next) => {
	try {
		const user = await User.findOne({ name: req.body.name });
		if (!user) return next(createError(404, "User not found!"));

		const isCorrect = await bcrypt.compare(req.body.password, user.password);
		if (!isCorrect) return next(createError(400, "Wrong credentials!"));

		const token = generateAccessToken(user._id);
		const { password, ...others } = user._doc;

		res
			.cookie("access_token", token, { httpOnly: true })
			.status(200)
			.json(others);
	} catch (error) {
		next(error);
	}
};
