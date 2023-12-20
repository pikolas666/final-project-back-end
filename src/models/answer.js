import mongoose from "mongoose";

const AnswerSchema = mongoose.Schema({
	answer_text: { type: String, required: true },
	date: { type: String, required: true },
	id: { type: String, required: true },
	upvotes: { type: [String], required: false },
	downvotes: { type: [String], required: false },
	question_id: { type: String, required: true },
	user_id: { type: String, required: true },
	user: { type: String, required: true },
});

export default mongoose.model("Answers", AnswerSchema);
