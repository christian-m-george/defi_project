import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return next();
  }

  const decoded = verifyJwt(accessToken);
  // console.log("Decoded:")
  console.log(decoded)
  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
};

export default deserializeUser;
