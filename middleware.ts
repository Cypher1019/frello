import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, orgId, redirectToSignIn } = await auth(); 

  const isPublic = isPublicRoute(req);
  const pathname = req.nextUrl.pathname;

  if (!userId && !isPublic) {
    return redirectToSignIn({ returnBackUrl: req.url }); 
  }

  if (userId && isPublic) {
    const dest = orgId ? `/organization/${orgId}` : '/select-org';
    return NextResponse.redirect(new URL(dest, req.url));
  }

  if (userId && !orgId && pathname !== '/select-org') {
    return NextResponse.redirect(new URL('/select-org', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
};
