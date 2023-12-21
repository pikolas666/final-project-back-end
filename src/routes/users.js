import express from "express";

import { REGISTER_USER, LOGIN, GET_USER_DATA } from "../controllers/users.js";
import validation from "../middleware/validation.js";
import { userRegistrationSchema } from "../validation/userSchema.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.post(
	"/users/register",
	validation(userRegistrationSchema),
	REGISTER_USER
);
router.post("/users/login", LOGIN);
router.get("/user", auth, GET_USER_DATA);

export default router;
