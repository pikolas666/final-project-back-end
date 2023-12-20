import express from "express";
import {
	ADD_ANSWER,
	DELETE_ANSWER,
	GET_ANSWERS_BY_ID,
	INCREASE_LIKES_NUMBER,
	DECREASE_LIKES_NUMBER,
} from "../controllers/answers.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/question/:id/answers", GET_ANSWERS_BY_ID);
router.post("/question/:id/answers", auth, ADD_ANSWER);
router.delete("/answer/:id", auth, DELETE_ANSWER);
router.post("/answer/:id/upvote", INCREASE_LIKES_NUMBER);
router.post("/answer/:id/downvote", DECREASE_LIKES_NUMBER);

export default router;
