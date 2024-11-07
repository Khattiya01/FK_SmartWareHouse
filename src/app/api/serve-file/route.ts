import { join } from "path";
import { stat, createReadStream } from "fs";
import { promisify } from "util";
import { NextRequest } from "next/server";
import { APIResponse } from "@/types/response";
import mime from "mime-types";


export async function GET(request: NextRequest) {
  const filename = request.nextUrl.searchParams.get("filename");
  const statAsync = promisify(stat);

  const filePath = join(process.cwd(), ".", filename as string);
  const responseJson: APIResponse<{
    imageUrl: any;
  }> = {
    status: 200,
    message: "OK",
    result: {
      total: 0,
      data: {
        imageUrl: "",
      },
    },
  };

  if (filename) {
    try {
      const fileStat = await statAsync(filePath);
      if (!fileStat.isFile()) {
        responseJson.status = 400;
        responseJson.message = "URL parameter is missing or not a valid file";
      }
      // ส่งไฟล์ไปยัง client
      const fileStream = createReadStream(filePath);
      responseJson.result.data = {
        imageUrl: fileStream,
      };

      // ดึงประเภทไฟล์จากนามสกุล
      const mimeType = mime.lookup(filename);
      if (!mimeType) {
        responseJson.status = 415;
        responseJson.message = "Unsupported file type";
      }

      return new Response(responseJson.result.data.imageUrl, {
        status: responseJson.status,
        headers: {
          "Content-Type": mimeType || "application/octet-stream",  // ใช้ mime type ที่ได้, ถ้าไม่พบใช้ application/octet-stream
        },
      });
    } catch {
      responseJson.status = 500;
      responseJson.message = "Error fetching file";
    }
  } else {
    responseJson.status = 400;
    responseJson.message = "URL parameter is missing";
  }

  return new Response(responseJson.result.data.imageUrl, {
    status: responseJson.status,
    headers: {
      "Content-Type": "application/octet-stream", // fallback if there's an issue
    },
  });
}