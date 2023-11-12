import bcrypt from "bcryptjs";
import User from "../model/User.model.js";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);
		const newUser = new User({ ...req.body, password: hash });

		await newUser.save();
		res.status(200).send("User has been Created!!!");
	} catch (err) {
		next(err);
	}
};

export const signin = async (req, res, next) => {
	try {
		const user = await User.findOne({ name: req.body.name });
		if (!user) return next(createError(404, "User not found!"));
		const isCorrect = await bcrypt.compare(req.body.password, user.password);
		if (!isCorrect) return next(createError(404, "Wrong Credentials!"));

		// Creating Access Token
		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_SECRET
		);

		const { password, ...others } = user._doc; // To hide password

		res
			.cookie("access_token", token, {
				httpOnly: true,
			})
			.status(200)
			.json(others);
	} catch (err) {
		next(err);
	}
};