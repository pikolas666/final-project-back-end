import express from "express";

import { REGISTER_USER, LOGIN } from "../controllers/users.js";
import validation from "../middleware/validation.js";
import { userRegistrationSchema } from "../validation/userSchema.js";

const router = express.Router();

router.post(
	"/users/register",
	validation(userRegistrationSchema),
	REGISTER_USER
);
router.post("/users/login", LOGIN);

export default router;
