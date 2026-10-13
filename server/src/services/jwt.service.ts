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

export function verifyAccessToken(
  token: string,
): jwt.JwtPayload & { sub: string } {
  const decoded = jwt.verify(token, getJwtSecret());

  if (typeof decoded === "string" || typeof decoded.sub !== "string") {
    throw new Error("Invalid access token payload");
  }

  return decoded as jwt.JwtPayload & { sub: string };
}
