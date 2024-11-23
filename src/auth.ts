import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { InActiveAccountError, InvalidEmailPasswordError } from "./utils/error";
import { sendRequest } from "./utils/api";
import { IUser } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        const res = await sendRequest<IBackendRes<ILogin>>({
          method: "POST",
          url: "http://localhost:8081/api/v1/auth/login",
          body: {
            username: credentials.email,
            password: credentials.password,
          },
        });
        if (!res.statusCode) {
          return {
            _id: res.data?.user._id,
            username: res.data?.user.name,
            email: res.data?.user.email,
            access_token: res.data?.access_token,
          };
        } else if (+res.statusCode === 401) {
          throw new InvalidEmailPasswordError();
        } else if (+res.statusCode === 400) {
          throw new InActiveAccountError();
        } else {
          throw new Error("Internal server error");
        }

        // logic to verify if the user exists
        //call backend
        // user = {
        //   _id: "123",
        //   username: "123",
        //   email: "123",
        //   isVerify: "123",
        //   type: "123",
        //   role: "123",
        // };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.user = user as IUser;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as IUser) = token.user;
      return session;
    },
  },
});