import { env } from "@/config/env";

it("loads path aliases and test env", () => {
  expect(env.NEXT_PUBLIC_API_URL).toBe("http://localhost:9999");
});