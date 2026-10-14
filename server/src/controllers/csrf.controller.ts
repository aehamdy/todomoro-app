import type { RequestHandler } from "express";
import { createCsrfToken } from "../services/csrf.service.js";

export const getCsrfToken: RequestHandler = (_req, res) => {
  const csrfToken = createCsrfToken();

  res.cookie("csrfToken", csrfToken, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.setHeader("Cache-Control", "no-store");

  res.status(200).json({
    status: "success",
    csrfToken,
  });
};
