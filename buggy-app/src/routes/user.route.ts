import { Router } from "express";
import { getUserController } from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUserController);

export default router;