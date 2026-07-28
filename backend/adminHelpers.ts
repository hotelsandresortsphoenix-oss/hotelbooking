import type { NextRequest } from "next/server";

export function assertAdmin(request: NextRequest) {
  const key = process.env.ADMIN_API_KEY?.trim();

  if (!key) {
    return true;
  }

  return request.headers.get("x-admin-key") === key;
}

export function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function makeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function jsonError(message: string, status = 400) {
  return Response.json({ error: message }, { status });
}
