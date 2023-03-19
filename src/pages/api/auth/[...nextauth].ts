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
      async authorize(credentials) {
        console.log(credentials);

        // return null; // falle el login

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

  // callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log({token, account, user});

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case 'oauth':
            // create or check if it already exist in DB
            token.user = await dbUsers.oAuthToDBUser(user?.email!, user?.name!);
            break;

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
