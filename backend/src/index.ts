import express from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { PrismaClient, users as PrismaUser } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;
const prisma = new PrismaClient();

app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

type User = PrismaUser;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/callback',
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: any, user?: any) => void
    ) => {
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      if (!email) {
        return done(new Error('No email found in profile'), null);
      }

      const user = await prisma.users.upsert({
        where: { google_id: profile.id },
        update: { name: profile.displayName, email: email },
        create: {
          google_id: profile.id,
          name: profile.displayName,
          email: email,
        },
      });
      return done(null, user);
    }
  )
);

passport.serializeUser((user: any, done: (err: any, id?: number) => void) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done: (err: any, user?: any | null) => void) => {
  const user = await prisma.users.findUnique({ where: { id } });
  done(null, user);
});

app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/api/auth/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:3000'); // フロントエンドのURLにリダイレクト
  }
);

app.get('/api/auth/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.get('/', async (req, res) => {
  const users = await prisma.users.findMany();
  res.json(users);
});

app.listen(port, () => {
  console.log(`Backend server is running at http://localhost:${port}`);
});
