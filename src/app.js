import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import getCandle from "./api/getCandle";
import start from "./start";
const app = express();

// const handleHome = (req, res) => res.send("시작합니다~");

// const handleProfile = (req, res) => res.send("You are on my profile");

// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(helmet());
app.use(morgan("dev"));

app.get("/", start);
// app.use(binance);

// app.get("/profile", handleProfile);

// app.use("/user", userRouter);

export default app;
