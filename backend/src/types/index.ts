export interface User {
  id: string;
  email: string;
  name: string;
  provider: string;
  googleId?: string;
  facebookId?: string;
  profilePictureUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthRequest extends Request {
  user?: User;
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
