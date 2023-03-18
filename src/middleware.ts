// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import * as jose from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const previousPage = req.nextUrl.pathname;

  // // //  Conditional Statements
  if (req.nextUrl.pathname.startsWith('/checkout')) {
    const token = req.cookies.get('token')?.value || '';

    try {
      await jose.jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_SEED)
      );

      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }
  }

  // // gen new response and pass a body with status:
  // return new NextResponse(
  //   JSON.stringify({ success: false, message: 'Error', token }),
  //   { status: 401, headers: { 'content-type': 'application/json' } }
  // );

  // // simple redirect:
  // return NextResponse.redirect(new URL('/about-2', request.url));
}

// // //  See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/checkout/:path*'],
// };
