import type { NextAuthConfig } from "next-auth"

export default {
    providers: [],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                // @ts-ignore
                session.user.role = token.role
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                // @ts-ignore
                token.role = user.role
            }
            return token
        },
    },
} satisfies NextAuthConfig
