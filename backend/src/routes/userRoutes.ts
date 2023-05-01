import express from "express";
import {
  createUserHandler,
  forgotPasswordHandler,
  getBalanceHandler,
  getCurrentUserHandler,
  resetPasswordHandler,
  updateBalanceHandler,
  verifyUserHandler,
} from "../controller/userController";
import validateResource from "../middleware/validateResource";
import {
  createUserSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateBalanceSchma,
  verifyUserSchema,
} from "../schema/userSchema";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post(
  "/api/users",
  validateResource(createUserSchema),
  createUserHandler,
  () => {
    console.log("here");
  }
);

router.get(
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
  "/api/users/resetpassword/:id/:passwordResetCode",
  validateResource(resetPasswordSchema),
  resetPasswordHandler
);

router.get(
  "/api/users/balance",
  requireUser,
  getBalanceHandler
);

router.post(
  "/api/users/balance",
  validateResource(updateBalanceSchma),
  updateBalanceHandler
);


router.get("/api/users/me", getCurrentUserHandler);

export default router;
