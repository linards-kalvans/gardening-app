import { Profile, Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import type { PassportStatic } from 'passport';
import { UserService } from '../../services/userService';

export function configurePassport(passport: PassportStatic): void {
  // Serialize only user ID into the session
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  // Deserialize by loading user from DB
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await UserService.findById(id);
      return done(null, user || undefined);
    } catch (err) {
      return done(err as any);
    }
  });

  // Google OAuth 2.0 Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL:
            process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3001/api/auth/google/callback'
        },
        async (_accessToken: string, _refreshToken: string, profile: Profile, done) => {
          try {
            const email = profile.emails?.[0]?.value || '';
            const name = profile.displayName || profile.name?.givenName || 'User';
            const googleId = profile.id;
            const photo = profile.photos?.[0]?.value;

            let user = await UserService.findByGoogleId(googleId);
            if (!user && email) {
              const existingByEmail = await UserService.findByEmail(email);
              if (existingByEmail) {
                user = await UserService.updateUser(existingByEmail.id, {
                  googleId,
                  provider: 'google',
                  name,
                  profilePictureUrl: photo
                });
              }
            }
            if (!user) {
              user = await UserService.createUser({
                email,
                name,
                provider: 'google',
                googleId,
                profilePictureUrl: photo
              });
            }
            return done(null, user);
          } catch (err) {
            return done(err as any);
          }
        }
      )
    );
  }

  // Facebook Strategy
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL:
            process.env.FACEBOOK_CALLBACK_URL || 'http://localhost:3001/api/auth/facebook/callback',
          profileFields: ['id', 'displayName', 'photos', 'email']
        },
        async (_accessToken: string, _refreshToken: string, profile: any, done) => {
          try {
            const email = profile.emails?.[0]?.value || '';
            const name = profile.displayName || 'User';
            const facebookId = profile.id;
            const photo = profile.photos?.[0]?.value;

            let user = await UserService.findByFacebookId(facebookId);
            if (!user && email) {
              const existingByEmail = await UserService.findByEmail(email);
              if (existingByEmail) {
                user = await UserService.updateUser(existingByEmail.id, {
                  facebookId,
                  provider: 'facebook',
                  name,
                  profilePictureUrl: photo
                });
              }
            }
            if (!user) {
              user = await UserService.createUser({
                email,
                name,
                provider: 'facebook',
                facebookId,
                profilePictureUrl: photo
              });
            }
            return done(null, user);
          } catch (err) {
            return done(err as any);
          }
        }
      )
    );
  }
}


