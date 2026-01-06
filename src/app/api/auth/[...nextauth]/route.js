import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (session.user) {
                session.user.id = user.id;

                // Secure Admin Check using Environment Variable
                if (session.user.email === process.env.ADMIN_EMAIL) {
                    session.user.role = 'admin';
                } else {
                    session.user.role = 'user';
                }
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            // Allows callback URLs on the same origin
            if (new URL(url).origin === baseUrl) return url;
            // Default to dashboard
            return `${baseUrl}/dashboard`;
        },
    },
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET,
    // Explicitly set the URL to fix CLIENT_FETCH_ERROR
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
