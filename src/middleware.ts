// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { ValidAdminRoles } from './interfaces';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // // //  Conditional Statements
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const previousPage = req.nextUrl.pathname || '/';

  if (req.nextUrl.pathname.startsWith('/checkout')) {
    // // useful info about user logged in
    // console.log({ session });

    if (!session) {
      return NextResponse.redirect(
        new URL(`/auth/login?p=${previousPage}`, req.url)
      );
    }

    return NextResponse.next();
  }

  // // // authorization
  const validRoles: ValidAdminRoles[] = [
    ValidAdminRoles.admin,
    ValidAdminRoles.superUser,
  ];

  if (
    !session &&
    req.nextUrl.pathname.startsWith('/api/admin') &&
    !validRoles.includes(session?.user?.role)
  ) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-type': 'application/json' },
    });
  }

  if (
    previousPage.includes('/admin') &&
    !validRoles.includes(session?.user?.role)
  ) {
    return NextResponse.redirect(new URL('/', req.url));
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

/*

  **** Custom Auth without NextAuth


*/
/* // middleware.ts
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
 */
