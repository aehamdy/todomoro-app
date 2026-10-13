import "express";
/*
Add a type for the authenticated request
Express doesn't know about a custom userId property on its Request type. We'll extend that type so TypeScript understands it.

userId is optional because public requests won't have an authenticated user.
*/

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export {};
