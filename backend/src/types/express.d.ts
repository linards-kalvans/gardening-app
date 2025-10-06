// Augment Express.User to include our application's user fields for tests and runtime
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name?: string;
      provider?: string;
      googleId?: string;
      facebookId?: string;
      profilePictureUrl?: string;
    }
  }
}

export {};


