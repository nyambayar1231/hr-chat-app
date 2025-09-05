import NextAuth from 'next-auth';
import MicrosoftEntraID from 'next-auth/providers/microsoft-entra-id';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER!,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/api/auth/error',
  },
  callbacks: {
    authorized: async ({ auth }) => {
      console.log('Auth check:', auth);
      return !!auth?.user;
    },
    jwt: async ({ token, account, profile }) => {
      console.log('JWT callback:', { token, account, profile });
      return token;
    },
    session: async ({ session, token }) => {
      console.log('Session callback:', { session, token });
      return session;
    },
  },

  trustHost: true,
  debug: process.env.NODE_ENV === 'development',
});
