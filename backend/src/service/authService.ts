import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";
import SessionModel from "../model/sessionModel";
import { privateFields, User } from "../model/userModel";
import { signJwt } from "../utils/jwt";
// import { findUserByID } from "./userService";

export async function createSession({ userId }: { userId: string }) {
  return SessionModel.create({ user: userId });
}

export async function findSessionById(id: string) {
  return SessionModel.findById(id);
}

export async function signRefreshToken({ userId }: { userId: string }) {
  // console.log('at refresh')
  const session = await createSession({
    userId,
  });

  const refreshToken = signJwt(
    {
      session: session._id,
    },
    {
      expiresIn: "1y",
    }
  );

  return refreshToken;
}

export function signAccessToken(user: DocumentType<User>) {
  // console.log('at access')
  const payload = omit(user.toJSON(), privateFields);

  const accessToken = signJwt(payload, {
    expiresIn: "60m",
  });

  return accessToken;
}
