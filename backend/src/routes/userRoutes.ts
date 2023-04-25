import express from "express";
import {
  createUserHandler,
  forgotPasswordHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  verifyUserHandler,
} from "../controller/userController";
import validateResource from "../middleware/validateResource";
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyUserSchema,
} from "../schema/userSchema";

const router = express.Router();

router.post(
  "/api/users",
  validateResource(createUserSchema),
  createUserHandler,
  () => {
    console.log("here");
  }
);

router.post(
  "/api/users/verify/:id/:verificationCode",
  validateResource(verifyUserSchema),
  verifyUserHandler
);

router.post(
  "/api/users/forgotpassword",
  validateResource(forgotPasswordSchema),
  forgotPasswordHandler
);

router.post(
  "api/userse/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.get("/api/users/me", getCurrentUserHandler);

export default router;
