import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      profile(profile) {
        return { role: profile.role ?? "Tenant", ...profile };
      },
    }),
    GitHub,
  ],
  pages: {
    signIn: "/signIn",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        const res = await fetch(`${process.env.NEST_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            provider: account.provider,
            providerId: profile.sub || profile.id,
            email: profile.email,
            name: profile.name || profile.login,
            imageUrl: user.image || profile.picture,
          }),
        });
        const data = await res.json();
        token.accessToken = data.access_token;
        token.user = data.user;
      }

      return token;
    },
  },
});
