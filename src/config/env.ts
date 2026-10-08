import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url({ message: "must be a valid URL, e.g. http://localhost:4000" }),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});

if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(parsed.error)}\n` +
      `Check your .env.local against .env.example.`,
  );
}

export const env = parsed.data;