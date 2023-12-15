import express from "express";
import {
	ADD_ANSWER,
	GET_ANSWERS,
	DELETE_ANSWER,
} from "../controllers/answers.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/question/:id/answers", GET_ANSWERS);
router.post("/question/:id/answers", ADD_ANSWER);
router.delete("/question/:id", DELETE_ANSWER);

export default router;
