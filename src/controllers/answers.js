import AnswerModel from "../models/answer.js";

const ADD_ANSWER = async (req, res) => {
	try {
		const answer = new AnswerModel({
			answer_text: req.body.answer_text,
			date: new Date().toLocaleString("lt-LT", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: false,
			}),
			user_id: req.body.user_id,
			user: req.body.user,
			gained_likes_number: 0,
			question_id: req.params.id,
		});

		answer.id = answer._id;

		const response = await answer.save();

		return res.status(201).json({ response: response });
	} catch (error) {
		console.error("Error adding answer:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

// const GET_ANSWERS = async (req, res) => {
// 	try {
// 		const answers = await AnswerModel.find();
// 		return res.status(200).json({ answers: answers });
// 	} catch (err) {
// 		console.error(err);
// 		return res.status(500).json({ message: "Something went wrong" });
// 	}
// };

const GET_ANSWERS_BY_ID = async (req, res) => {
	try {
		const questionId = req.params.id;

		const answers = await AnswerModel.find({ question_id: questionId });

		return res.status(200).json({ answers });
	} catch (error) {
		console.error("Error fetching answers:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

const DELETE_ANSWER = async (req, res) => {
	try {
		const response = await AnswerModel.deleteOne({ _id: req.params.id });
		return res.status(200).json({ response: response });
	} catch (error) {
		console.error("Error deleting answer:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

const INCREASE_LIKES_NUMBER = async (req, res) => {
	const answerId = req.params.id;
	try {
		const updatedLikesNumber = await AnswerModel.findByIdAndUpdate(
			answerId,
			{ $inc: { gained_likes_number: +1 } },
			{ new: true }
		);

		res.status(201).json({ success: true, answer: updatedLikesNumber });
	} catch (error) {
		console.error("Error upvoting answer:", error);
		res.status(500).json({ success: false, error: "Internal Server Error" });
	}
};

const DECREASE_LIKES_NUMBER = async (req, res) => {
	const answerId = req.params.id;
	try {
		const updatedLikesNumber = await AnswerModel.findByIdAndUpdate(
			answerId,
			{ $inc: { gained_likes_number: -1 } },
			{ new: true }
		);

		res.status(201).json({ success: true, answer: updatedLikesNumber });
	} catch (error) {
		console.error("Error upvoting answer:", error);
		res.status(500).json({ success: false, error: "Internal Server Error" });
	}
};

export {
	ADD_ANSWER,
	DELETE_ANSWER,
	GET_ANSWERS_BY_ID,
	INCREASE_LIKES_NUMBER,
	DECREASE_LIKES_NUMBER,
};
