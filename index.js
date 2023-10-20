import express from "express";
import bodyParser from "body-parser";
import UserRoute from "./src/routes/UserRoute.js";
import session from "express-session";
import cors from "cors";

const app = express();
const port = 3001;

const allowedOrigins = ["http://localhost:3001/"];
const options = {
    origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    session({
        secret: "La_Crêperie_du_Parvis",
        resave: false,
        saveUninitialized: false,
    })
);

app.use("/api", UserRoute);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

export default app;
