import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./src/routes/users.js";
import questionRouter from "./src/routes/questions.js";
import answerRouter from "./src/routes/answers.js";

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(questionRouter);
app.use(answerRouter);

mongoose
	.connect(process.env.MONGO_CONNECTION)
	.then(() => console.log("Connected to DB!"))
	.catch((err) => {
		console.log("err:", err);
	});

app.listen(process.env.PORT, () => {
	console.log(`App connected on port ${process.env.PORT}`);
});
