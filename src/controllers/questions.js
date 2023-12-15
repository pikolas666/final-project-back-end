import QuestionModel from "../models/question.js";

const ADD_QUESTION = async (req, res) => {
	try {
		const question = new QuestionModel({
			question_text: req.body.question_text,
			date: new Date().toISOString(),
			user_id: req.body.user_id,
		});

		question.id = question._id;

		const response = await question.save();

		return res.status(200).json({ response: response });
	} catch (error) {
		console.error("Error adding question:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

const GET_QUESTIONS = async (req, res) => {
	const questions = await QuestionModel.find();
	return res.status(200).json({ questions: questions });
};

const DELETE_QUESTION = async (req, res) => {
	const response = await QuestionModel.deleteOne({ _id: req.params.id });
	return res.status(200).json({ response: response });
};

export { ADD_QUESTION, GET_QUESTIONS, DELETE_QUESTION };
