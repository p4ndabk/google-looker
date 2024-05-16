import { Router } from "express";
import { AuthenticateUser } from "../controller/login.controller";
const router = Router();

router.post("/", AuthenticateUser);

export default router;
