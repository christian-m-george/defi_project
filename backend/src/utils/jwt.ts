import jwt from "jsonwebtoken";

import config from "config";

export function signJwt(
  object: Object,
  options?: jwt.SignOptions | undefined
) {
  const jwtSecret = config.get<string>('secret')

  return jwt.sign(object, jwtSecret, {
    ...(options && options)
  });
}

export function verifyJwt<T>(
  token: string,
): T | null {
  try {
    const decoded = jwt.verify(token, config.get<string>('secret')) as T;
    return decoded;
  } catch (e) {
    return null;
  }
}
