import { z } from "zod";
import { serviceOptions } from "@/content/services";

export const contactMethods = ["Telephone", "Email", "WhatsApp"] as const;
export const consultationFormats = ["In-person", "Virtual", "Home visit", "Not sure yet"] as const;

const phonePattern = /^[+()\d\s-]{7,20}$/;

export const enquirySchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your name.").max(100, "Please shorten your name."),
    email: z
      .string()
      .trim()
      .max(160)
      .optional()
      .transform((v) => (v ? v : undefined))
      .refine((v) => !v || z.string().email().safeParse(v).success, "Please enter a valid email address."),
    phone: z
      .string()
      .trim()
      .max(25)
      .optional()
      .transform((v) => (v ? v : undefined))
      .refine((v) => !v || phonePattern.test(v), "Please enter a valid telephone number."),
    contactMethod: z.enum(contactMethods, { message: "Please choose how you would like to be contacted." }),
    service: z.enum(serviceOptions as [string, ...string[]], { message: "Please choose a service." }),
    format: z.enum(consultationFormats, { message: "Please choose a consultation format." }),
    message: z.string().trim().max(1000, "Please keep your message under 1,000 characters.").optional(),
    consent: z.literal(true, { message: "Please confirm that we may contact you about your enquiry." }),
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;
export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

/**
 * Validates an enquiry, including the contact detail required by the chosen
 * contact method. Used by both the browser and the server endpoint.
 */
export function validateEnquiry(input: unknown):
  | { success: true; data: EnquiryInput }
  | { success: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const k = issue.path[0] as keyof FieldErrors;
      if (k && !errors[k]) errors[k] = issue.message;
    }
  }
  const raw = (input ?? {}) as Record<string, unknown>;
  const has = (k: string) => typeof raw[k] === "string" && (raw[k] as string).trim().length > 0;
  if (raw.contactMethod === "Email" && !has("email") && !errors.email) {
    errors.email = "Please enter your email address so we can reply.";
  }
  if ((raw.contactMethod === "Telephone" || raw.contactMethod === "WhatsApp") && !has("phone") && !errors.phone) {
    errors.phone = "Please enter your telephone number so we can reply.";
  }
  if (!parsed.success || Object.keys(errors).length) return { success: false, errors };
  return { success: true, data: parsed.data };
}
