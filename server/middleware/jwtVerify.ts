import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config();

const jwtVerify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { auth } = req.cookies;

    if (!auth) {
      return res
        .status(403)
        .json({ msg: "Not Authorized", user: null, token: "" });
    } else {
      const data = jwt.verify(
        auth,
        process.env.JWT_SECRET as string
      ) as JwtPayload;
      req.user = data.id;
      return next();
    }
  } catch (error) {
    return res
      .status(403)
      .json({ msg: "Not Authorized", user: null, token: "" });
  }
  next();
};

export default jwtVerify;
