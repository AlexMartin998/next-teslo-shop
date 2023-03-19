import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { dbUsers } from '@/api';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Custom Login',
      credentials: {
        // inputs to recives
        email: {
          label: 'Email:',
          type: 'email',
          placeholder: 'eamil@email.com',
        },
        password: {
          label: 'Password:',
          type: 'password',
          placeholder: 'Password',
        },
      },

      // login & register pass through here
      async authorize(credentials) {
        // console.log(credentials);  // callbackUrl = url that init invoke this provider

        // return null; // falla el auth
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
      },
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],

  // // // custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  // // No funciona con JWT, solo cuando se almacenan en DB las Session
  // https://next-auth.js.org/configuration/options
  // x defaul es   JWT, asi q NO es necesario
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 2592000, // 30d in seconds
  //   updateAge: 86400, // 1d
  // },

  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30d in seconds
  },

  // // // callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log({token, account, user});

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          // create or check if it already exist in DB and login
          case 'oauth':
            token.user = await dbUsers.oAuthToDBUser(user?.email!, user?.name!);
            break;

          // only login
          case 'credentials':
            token.user = user;
            break;

          default:
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      // console.log({ session, token, user });

      session.accessToken = token.accessToken as any;
      session.user = token.user as any;

      return session;
    },
  },
};

export default NextAuth(authOptions);
