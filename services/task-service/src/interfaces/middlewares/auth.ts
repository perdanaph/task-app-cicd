import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      username: string;
    };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};