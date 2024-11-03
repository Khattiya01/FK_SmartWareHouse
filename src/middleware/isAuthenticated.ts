import { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

export const isAuthenticated = (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return false;
  }
  return true;
};

export const checkTokenEvent = (req: Request, eventName: string) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    throw new Error("Token not provided");
  }

  const jwtPayload = verify(token, process.env.JWT_SECRET ?? "") as {
    userId: string;
    iat: number;
    type: string;
  };

  if (eventName === "reset-password" && jwtPayload.type !== "reset-password") {
    throw new Error("Token is invalid");
  }

  return jwtPayload;
};
