/** Sanity connection details. The project ID is public; set NEXT_PUBLIC_SANITY_PROJECT_ID to an empty string to run on built-in content only. */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "i8c5s1wx";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-01-01";
export const isCmsConfigured = projectId.length > 0;
