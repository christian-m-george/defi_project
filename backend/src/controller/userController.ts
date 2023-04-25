import { Request, Response } from "express";
import {
  CreateUserInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  VerifyUserInput,
} from "../schema/userSchema";
import {
  createUser,
  findUserByEmail,
  findUserByID,
} from "../service/userService";
import sendEmail from "../utils/mailer";
import log from "../utils/logger";
import { nanoid } from "nanoid";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
) {
  const body = req.body;
  try {
    const user = await createUser(body);
    await sendEmail({
      from: "defitest@defitest.com",
      to: user.email,
      subject: "please verify your account",
      text: `verification code ${user.verificationCode}. ID: ${user._id}`,
    });
    return res.send("user succesfully created");
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(409).send("account already exists");
    }
    return res.status(500).send(e);
  }
}

export async function verifyUserHandler(
  req: Request<VerifyUserInput, {}, {}>,
  res: Response
) {
  const id = req.params.id;
  const verificationCode = req.params.verificationCode;

  const user = await findUserByID(id);

  if (!user) {
    return res.send("could not verify user");
  }
  if (user.verified) {
    return res.send("user is already verified");
  }
  if (user.verificationCode === verificationCode) {
    user.verified = true;
    await user.save();
    return res.send("user successfully verified");
  }
  return res.send("could not verify user");
}

export async function forgotPasswordHandler(
  req: Request<{}, {}, ForgotPasswordInput>,
  res: Response
) {
  const message =
    "if a user with that email is registered you will receive a password reset email";
  const { email } = req.body;
  const user = await findUserByEmail(email);
  if (!user) {
    log.debug(`user with email ${email} does not exist`);
    return res.send(message);
  }

  if (!user.verified) {
    return res.send("user is not verified");
  }

  const passwordResetCode = nanoid();

  user.passwordResetCode = passwordResetCode;

  await user.save();

  await sendEmail({
    to: user.email,
    from: "defitest@defitest.com",
    subject: "Rest your password",
    text: `Password reset code: ${passwordResetCode}. ID ${user._id}`,
  });

  log.debug(`Password reset email sent to ${user.email}`);
  return res.send(message);
}

export async function resetPasswordHandler(
  req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>,
  res: Response
) {
  const { id, passwordResetCode } = req.params;
  const { password } = req.body;
  const user = await findUserByID(id);

  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode
  ) {
    return res.status(400).send("could not reset user password");
  }

  user.passwordResetCode = null;
  user.password = password;
  await user.save();
  return res.send("successfully updated user password");
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  return res.send(res.locals.user);
}
