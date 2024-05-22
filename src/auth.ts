// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
 import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "~/server/db"


export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub, Google],
  callbacks: {
    session({ session, user }) {
      // session.user.id = user.id
      return session
    },
  },
  adapter: DrizzleAdapter(db),
})