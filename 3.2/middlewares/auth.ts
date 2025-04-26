import { Request, Response, NextFunction } from "express";

const VALID_USERS: Record<string, string> = {
  admin: "secretpassword",
};

// Basic Auth Middleware
const adminAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Basic ")) {
    return sendAuthRequest(res, "Admin Area");
  }

  try {
    const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");

    if (VALID_USERS[username] === password) {
      next();
      return;
    }
  } catch {}

  return sendAuthRequest(res, "Admin Area");
};

const sendAuthRequest = (res: Response, realm = "Protected") => {
  res.set("WWW-Authenticate", `Basic realm="${realm}"`);
  res.status(401).send("Authentication required.");
};

export default {
  adminAuthMiddleware,
};
