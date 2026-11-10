import "express";

/**
 * Extend Express Request with the authenticated user's ID.
 * Optional because public requests may not have an authenticated user.
 */
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export {};
