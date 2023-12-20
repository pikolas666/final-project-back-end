import QuestionModel from "../models/question.js";

const ADD_QUESTION = async (req, res) => {
	try {
		const question = await new QuestionModel({
			question_text: req.body.question_text,
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
	try {
		const users = await QuestionModel.aggregate([
			{
				$lookup: {
					from: "answers",
					localField: "id",
					foreignField: "question_id",
					as: "answers",
				},
			},
		]);

		return res.status(200).json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "something went wrong" });
	}
};

const GET_QUESTION_BY_ID = async (req, res) => {
	const question = await QuestionModel.findOne({ _id: req.params.id });
	return res.status(200).json({ question });
};

const DELETE_QUESTION = async (req, res) => {
	try {
		const response = await QuestionModel.deleteOne({ _id: req.params.id });

		if (response.deletedCount === 0) {
			return res.status(404).json({ message: "Question not found" });
		}

		return res.status(200).json({ message: "Question deleted successfully" });
	} catch (error) {
		console.error("Error deleting question:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export { ADD_QUESTION, GET_QUESTIONS, DELETE_QUESTION, GET_QUESTION_BY_ID };
