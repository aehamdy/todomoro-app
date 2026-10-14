import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

const TOKEN_BYTES = 32;

function getCsrfSecret(): string {
  const secret = process.env.CSRF_SECRET;

  if (!secret) {
    throw new Error("CSRF_SECRET is not defined");
  }

  return secret;
}

export function createCsrfToken(): string {
  const randomValue = randomBytes(TOKEN_BYTES).toString("hex");

  const signature = createHmac("sha256", getCsrfSecret())
    .update(randomValue)
    .digest("hex");

  return `${randomValue}.${signature}`;
}

export function verifyCsrfToken(token: string): boolean {
  const parts = token.split(".");

  if (parts.length !== 2) {
    return false;
  }

  const [randomValue, providedSignature] = parts;

  if (
    !randomValue ||
    !providedSignature ||
    !/^[a-f0-9]{64}$/.test(randomValue) ||
    !/^[a-f0-9]{64}$/.test(providedSignature)
  ) {
    return false;
  }

  const expectedSignature = createHmac("sha256", getCsrfSecret())
    .update(randomValue)
    .digest();

  const actualSignature = Buffer.from(providedSignature, "hex");

  return timingSafeEqual(expectedSignature, actualSignature);
}
