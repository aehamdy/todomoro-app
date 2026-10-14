import type { RequestHandler } from "express";
import { timingSafeEqual } from "node:crypto";
import { verifyCsrfToken } from "../services/csrf.service.js";

export const requireCsrfToken: RequestHandler = (req, res, next) => {
  /*
    -The middleware reads the CSRF token from the cookie and the X-CSRF-Token header.
    -It requires both values to be strings and present.
    -It checks that the cookie and header match.
    -It verifies the signature using your CSRF_SECRET.
    -If validation fails, the request receives 403 Forbidden; otherwise, it proceeds.
*/
  const cookieToken: unknown = req.cookies?.csrfToken;
  const headerToken: unknown = req.headers["x-csrf-token"];

  if (
    typeof cookieToken !== "string" ||
    typeof headerToken !== "string" ||
    !cookieToken ||
    !headerToken
  ) {
    res.status(403).json({
      status: "fail",
      message: "CSRF token is missing",
    });
    return;
  }

  const cookieBuffer = Buffer.from(cookieToken);
  const headerBuffer = Buffer.from(headerToken);

  if (
    cookieBuffer.length !== headerBuffer.length ||
    !timingSafeEqual(cookieBuffer, headerBuffer) ||
    !verifyCsrfToken(cookieToken)
  ) {
    res.status(403).json({
      status: "fail",
      message: "Invalid CSRF token",
    });
    return;
  }

  next();
};
