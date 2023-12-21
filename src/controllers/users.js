import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const REGISTER_USER = async (req, res) => {
	try {
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(req.body.password, salt);

		const user = new UserModel({
			name: req.body.name,
			password: hash,
			email: req.body.email,
		});

		user.id = user._id;

		const response = await user.save();

		return res
			.status(201)
			.json({ message: "User registered", response: response });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Something happened" });
	}
};

const LOGIN = async (req, res) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });

		if (!user) {
			return res.status(401).json({ message: "Bad email or password" });
		}

		const isPasswordMatch = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!isPasswordMatch) {
			return res.status(401).json({ message: "Bad email or password" });
		}

		const token = jwt.sign(
			{ name: user.name, email: user.email, user_id: user._id },
			process.env.JWT_SECRET,
			{ expiresIn: "12h" }
		);

		return res
			.status(200)
			.json({ message: "User logged in successfully", token: token });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Something happened" });
	}
};

const GET_USER_DATA = async (req, res) => {
	try {
		const user = await UserModel.findById(req.body.user_id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		return res.status(200).json({
			user_id: user._id,
			name: user.name,
		});
	} catch (error) {
		console.error("Error fetching user data:", error);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

export { REGISTER_USER, LOGIN, GET_USER_DATA };
