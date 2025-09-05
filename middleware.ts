export { auth as middleware } from '@/auth';

// export const config = {
//   matcher: ['/chat', '/((?!api/auth|_next/|favicon.ico|login|public/).*)'],
// };

export const config = {
  matcher: ['/chat'],
};
