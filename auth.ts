import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (Credentials) => {
        // call api sign in
        const response = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",
          body: JSON.stringify(Credentials),
          headers: {
            "content-type": "application/json",
          },
        });
        const payload = await response.json();
        console.log(payload);
        if (payload.message == "success") {
          //   return payload.user;

          const decode: { id: string } = jwtDecode(payload.token);
          console.log("decode user token ", decode);

          return {
            id: decode.id,
            user: payload.user,
            token: payload.token,
          };
        } else {
          throw new Error(" invalid email or password");
        }
        // return null;
        // return payload.user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }

      return token; //  encrypted object
    },
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
  },
};
