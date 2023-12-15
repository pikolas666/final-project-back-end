import mongoose from "mongoose";

const QuestionSchema = mongoose.Schema({
	question_text: { type: String, required: true },
	date: { type: String, required: true },
	id: { type: String, required: true },
	user_id: { type: String, required: true },
});

export default mongoose.model("Questions", QuestionSchema);
