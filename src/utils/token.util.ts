import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface JwtPayload {
  id: string;
  role: "admin" | "student";
}

export const generateToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

