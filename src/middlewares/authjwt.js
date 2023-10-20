import jwt from "jsonwebtoken";

// Fonction pour générer un token unique
const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);

        const userId = decodedToken.userId.id; //token decodé

        console.log("userId : ", userId);

        res.locals.userId = userId;

        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};

export default auth;
