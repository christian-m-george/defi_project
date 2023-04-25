import express from "express";
import user from "./userRoutes";
import auth from "./authRoutes";

const router = express.Router();

router.get("/healthCheck", (_, res) => res.sendStatus(200));
router.use(user);
router.use(auth);

export default router;
