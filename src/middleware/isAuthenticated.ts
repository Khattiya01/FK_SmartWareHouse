import { NextRequest } from "next/server";


export const isAuthenticated = (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log("token isAuthenticated", token);
  if (!token) {
    return false;
  }
  return true;
};
