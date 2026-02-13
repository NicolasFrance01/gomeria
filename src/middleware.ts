import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            if (req.nextUrl.pathname === "/login") {
                return true
            }
            return !!token
        },
    },
})

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"] }
