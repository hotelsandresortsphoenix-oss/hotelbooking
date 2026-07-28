import { mkdir, writeFile } from "fs/promises";
import path from "path";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const MAX_SIZE = 5 * 1024 * 1024;

function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}

function assertAdmin(request: NextRequest) {
  const key = process.env.ADMIN_API_KEY?.trim();

  if (!key) {
    return true;
  }

  return request.headers.get("x-admin-key") === key;
}

function safeExtension(fileName: string, mimeType: string) {
  const extFromName = path.extname(fileName).toLowerCase().replace(".", "");
  const allowedExt = ["jpg", "jpeg", "png", "webp", "gif", "avif"];

  if (allowedExt.includes(extFromName)) return extFromName;

  const fromMime = mimeType.split("/")[1];
  return allowedExt.includes(fromMime) ? fromMime : "jpg";
}

export async function POST(request: NextRequest) {
  if (!assertAdmin(request)) {
    return jsonError("Invalid admin key.", 401);
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return jsonError("No file uploaded.");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return jsonError("Only image files are allowed (jpg, png, webp, gif, avif).");
  }

  if (file.size > MAX_SIZE) {
    return jsonError("Image must be 5MB or smaller.");
  }

  const uploadDir = path.join(process.cwd(), "public", "images", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const ext = safeExtension(file.name, file.type);
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const filePath = path.join(uploadDir, fileName);

  const bytes = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(bytes));

  return Response.json({ path: `/images/uploads/${fileName}` }, { status: 201 });
}
