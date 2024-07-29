import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import GoogleProvider from "next-auth/providers/google";

const options = {
  trustHost: true,
  trustHostedDomain: true,
  providers: [
    // GoogleProvider({
    //   clientId:
    //     "397431052093-7uksi0nj07m9dvdafqusbr6to8vpjch9.apps.googleusercontent.com",
    //   clientSecret: "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",
    // }),
    Google({
      clientId:
        "397431052093-7uksi0nj07m9dvdafqusbr6to8vpjch9.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(options);
