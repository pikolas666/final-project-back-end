import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ message: "Bad auth" });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).json({ message: "Bad auth" });
		}
		// sita eilute pravers ateity
		req.body.name = decoded.name;
		req.body.userId = decoded.id;
		return next();
	});
};

export default authenticateUser;
