import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./middleware/isAuthenticated";

const allowedOrigins = [process.env.NEXT_PUBLIC_FRONTEND_URL];

const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default async function middleware(req: NextRequest) {
  // Check the origin from the request
  const origin = req.headers.get("origin") ?? "";
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Call our authentication function to check the request
  if (!isAuthenticated(req)) {
    // Respond with JSON indicating an error message
    return Response.json(
      { success: false, message: "authentication failed" },
      { status: 401 }
    );
  }

  const res = NextResponse.next();
  if (isAllowedOrigin) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    res.headers.set(key, value);
  });

  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/reset-password/:path*"],
  // matcher: ["/api/manage/:path*", "/api/reset-password/:path*"],
};
