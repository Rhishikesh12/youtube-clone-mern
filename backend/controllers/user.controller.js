import { createError } from "../error.js";
import User from "../model/User.model.js";
import { verifyToken } from "../verifyToken.js";

export const update = async (req, res, next) => {
	try {
		await verifyToken(req, res, () => {});
		if (req.params.id === req.user.id) {
			try {
				const updateUser = await User.findById(
					req.params.id,
					{
						$set: res.body,
					},
					{ new: true }
				);
				res.status(200).json(updateUser);
			} catch (error) {}
		} else {
			return next(createError(403, "You can update only you account!"));
		}
	} catch (error) {
		console.error(error);
		next(error);
	}
};

export const deleteUser = (req, res, next) => {};

export const getUser = (req, res, next) => {};

export const subscribe = (req, res, next) => {};

export const unsubscribe = (req, res, next) => {};

export const like = (req, res, next) => {};
export const dislike = (req, res, next) => {};
