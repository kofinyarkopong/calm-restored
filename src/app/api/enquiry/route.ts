import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/enquiry-schema";
import { isEmailConfigured, sendEnquiryEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 3000;

export async function POST(request: Request) {
  // Reject cross-site posts
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ status: "error" }, { status: 403 });
  }

  if (!isEmailConfigured()) {
    return NextResponse.json({ status: "unavailable" }, { status: 503 });
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (!rateLimit(ip).allowed) {
    return NextResponse.json({ status: "rate_limited" }, { status: 429 });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ status: "error" }, { status: 400 });
  }

  // Spam protection: hidden honeypot field and minimum completion time.
  // Automated submissions are discarded without sending any email.
  const startedAt = Number(payload.startedAt);
  const tooFast = !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS;
  if (payload.website || tooFast) {
    return NextResponse.json({ status: "error" }, { status: 400 });
  }

  const parsed = validateEnquiry(payload);
  if (!parsed.success) {
    return NextResponse.json({ status: "invalid", errors: parsed.errors }, { status: 422 });
  }

  const result = await sendEnquiryEmail(parsed.data);
  if (!result.ok) {
    return NextResponse.json({ status: "error" }, { status: 502 });
  }
  return NextResponse.json({ status: "ok" });
}
