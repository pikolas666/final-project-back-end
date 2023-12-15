import express from "express";
import {
	ADD_QUESTION,
	GET_QUESTIONS,
	DELETE_QUESTION,
} from "../controllers/questions.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/question", ADD_QUESTION);
router.get("/questions", GET_QUESTIONS);
router.delete("/question/:id", DELETE_QUESTION);

export default router;
