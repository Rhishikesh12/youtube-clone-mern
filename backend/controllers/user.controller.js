import { createError } from "../error.js";
import User from "../model/User.model.js";

// Update User
export const update = async (req, res, next) => {
	try {
		if (req.params.id !== req.user.id) {
			return next(createError(403, "You can update only your account!"));
		}

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);

		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

// Delete User
export const deleteUser = async (req, res, next) => {
	try {
		if (req.params.id !== req.user.id) {
			return next(createError(403, "You can delete only your account!"));
		}

		await User.findByIdAndDelete(req.params.id);

		res.status(200).json("User has been deleted!");
	} catch (error) {
		next(error);
	}
};

// Get all the users
export const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};

// Subscribed User
export const subscribe = async (req, res, next) => {
	try {
		await User.findById(req.params.id, {
			$push: { subscribedUsers: req.params.id }, // "subscribedUsers"from user model
		});
		await User.findByIdAndUpdate(req.params.id, {
			$inc: { subscribers: 1 }, // "subscribers"from user model
		});
		res.status(200).json("Subscription Successfull!!");
	} catch (err) {
		next(err);
	}
};

export const unsubscribe = async (req, res, next) => {
	try {
		try {
			await User.findById(req.params.id, {
				$pull: { subscribedUsers: req.params.id }, // "subscribedUsers"from user model
			});
			await User.findByIdAndUpdate(req.params.id, {
				$inc: { subscribers: -1 }, // "subscribers"from user model
			});
			res.status(200).json("Unsubscribed Successfull!!");
		} catch (err) {
			next(err);
		}
	} catch (err) {
		next(err);
	}
};

export const like = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};
export const dislike = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.status(200).json(user);
	} catch (err) {
		next(err);
	}
};
