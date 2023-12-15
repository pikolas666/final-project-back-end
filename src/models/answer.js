import mongoose from "mongoose";

const AnswerSchema = mongoose.Schema({
	answer_text: { type: String, required: true },
	date: { type: String, required: true },
	id: { type: String, required: true },
	gained_likes_number: { type: Number, required: true },
	question_id: { type: String, required: true },
	user_id: { type: String, required: true },
});

export default mongoose.model("Answers", AnswerSchema);
