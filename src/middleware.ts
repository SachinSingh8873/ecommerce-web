import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const isAdmin = req.auth?.user?.role === "ADMIN"
    const isAuthPage = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/signup")
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

    if (isAuthPage) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/admin", req.nextUrl))
        }
        return null
    }

    if (isAdminRoute) {
        if (!isLoggedIn) {
            let callbackUrl = req.nextUrl.pathname
            if (req.nextUrl.search) {
                callbackUrl += req.nextUrl.search
            }
            const encodedCallbackUrl = encodeURIComponent(callbackUrl)
            return NextResponse.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl))
        }

        if (!isAdmin) {
            // Redirect non-admins to home or a forbidden page
            return NextResponse.redirect(new URL("/", req.nextUrl))
        }
    }

    return null
})

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
