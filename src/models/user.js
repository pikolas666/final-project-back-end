import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	name: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	id: { type: String },
});

export default mongoose.model("Users", UserSchema);
