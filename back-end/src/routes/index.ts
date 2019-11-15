import { Router } from "express";
import AuthRouter from "./Auth";
import UserRouter from "./Users";

const router = Router();

router.use("/users", UserRouter);
router.use("/auth", AuthRouter);

export default router;
