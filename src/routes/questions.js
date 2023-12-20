import express from "express";
import {
	ADD_QUESTION,
	GET_QUESTIONS,
	DELETE_QUESTION,
	GET_QUESTION_BY_ID,
} from "../controllers/questions.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/questions", GET_QUESTIONS);
router.get("/question/:id", GET_QUESTION_BY_ID);
router.post("/question", auth, ADD_QUESTION);
router.delete("/question/:id", auth, DELETE_QUESTION);

export default router;
