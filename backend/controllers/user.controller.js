import { createError } from "../error.js";
import User from "../model/User.model.js";

export const update = async (req, res, next) => {
	if (req.params.id === req.user.id) {
		try {
			const updateUser = await User.findById(req.params.id, {
				$set: res.body,
			});
			res.status(200).json(updateUser);
		} catch (error) {}
	} else {
		return next(createError(403, "You can update only you account!"));
	}
};

export const deleteUser = (req, res, next) => {};

export const getUser = (req, res, next) => {};

export const subscribe = (req, res, next) => {};

export const unsubscribe = (req, res, next) => {};

export const like = (req, res, next) => {};
export const dislike = (req, res, next) => {};
