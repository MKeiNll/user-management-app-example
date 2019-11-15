import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import path from "path";
import BaseRouter from "./routes";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", BaseRouter);

export default app;
