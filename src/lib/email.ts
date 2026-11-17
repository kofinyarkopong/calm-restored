import "server-only";
import type { EnquiryInput } from "./enquiry-schema";

/**
 * Enquiry emails are sent through Resend (https://resend.com).
 * Required server-side environment variables:
 *   RESEND_API_KEY      API key from Resend
 *   CONTACT_EMAIL       Where enquiries are delivered
 *   CONTACT_FROM_EMAIL  A sender on a domain verified in Resend,
 *                       e.g. "Calm Restored <enquiries@yourdomain.com>"
 */
export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL && process.env.CONTACT_FROM_EMAIL);
}

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEnquiryEmail(data: EnquiryInput): Promise<{ ok: true } | { ok: false }> {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email ?? "Not provided"],
    ["Telephone", data.phone ?? "Not provided"],
    ["Preferred contact", data.contactMethod],
    ["Service of interest", data.service],
    ["Consultation format", data.format],
    ["Message", data.message || "No message"],
  ];

  const text = [
    "New consultation enquiry from the Calm Restored website",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "The enquirer consented to be contacted about this enquiry.",
    "Reminder: this is an enquiry only. No appointment has been confirmed.",
  ].join("\n");

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#2b2530;background:#fbf6ee;padding:24px">
  <div style="max-width:560px;margin:auto;background:#fff;border-top:4px solid #49047e;padding:28px">
    <p style="font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#8a6d2b;margin:0 0 6px">Calm Restored</p>
    <h1 style="font-size:20px;color:#49047e;margin:0 0 20px">New consultation enquiry</h1>
    <table style="width:100%;border-collapse:collapse;font-size:15px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6b6470;width:42%;vertical-align:top">${escape(k)}</td><td style="padding:8px 0;border-bottom:1px solid #eee;white-space:pre-wrap">${escape(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-size:13px;color:#6b6470;margin-top:20px">The enquirer consented to be contacted about this enquiry. No appointment has been confirmed.</p>
  </div></body></html>`;

  try {
    const res = await fetch(process.env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL,
        to: process.env.CONTACT_EMAIL!.split(",").map((e) => e.trim()),
        reply_to: data.email,
        subject: `New consultation enquiry: ${data.service}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    // Only report success once the provider has accepted the message.
    if (!res.ok) {
      // Log status only, never enquiry contents.
      console.error(`Enquiry email rejected by provider (status ${res.status})`);
      return { ok: false };
    }
    const body = (await res.json().catch(() => null)) as { id?: string } | null;
    return body?.id ? { ok: true } : { ok: false };
  } catch {
    console.error("Enquiry email provider unreachable");
    return { ok: false };
  }
}
