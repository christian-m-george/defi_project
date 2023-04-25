import express from "express";
import { createSessionHandler } from "../controller/authController";
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from "../schema/authSchema";

const router = express.Router();

router.post(
  "/api/sessions/",
  validateResource(createSessionSchema),
  createSessionHandler
);

export default router;
