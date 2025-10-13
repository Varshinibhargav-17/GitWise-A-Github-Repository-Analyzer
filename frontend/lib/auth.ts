import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "./mongodb";
import User from "@/models/User";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: "read:user user:email repo" } },
    }),
  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) token.accessToken = account.access_token;
      if (profile && 'id' in profile) token.githubId = profile.id;
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).accessToken = token.accessToken;
        (session.user as any).githubId = token.githubId;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      console.log('SignIn callback triggered', { user, profile });
      try {
        await connectDB();
        console.log('Database connected successfully');
        const existingUser = await User.findOne({ email: user.email });
        console.log('Existing user check:', existingUser ? 'Found' : 'Not found');
        if (!existingUser) {
          const newUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            githubId: profile && 'id' in profile ? profile.id : undefined,
          });
          console.log('New user created:', newUser);
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },
  },

  pages: {
    signIn: "/signup", // Redirects to signup page for login
  },
  secret: process.env.NEXTAUTH_SECRET!,
};
