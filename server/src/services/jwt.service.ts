import jwt, { type SignOptions } from "jsonwebtoken";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error("JWT_SECRET is not defined");

  return secret;
}

export function signAccessToken(userId: string): string {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign({ sub: userId }, getJwtSecret(), {
    expiresIn: expiresIn as SignOptions["expiresIn"],
  });
}
