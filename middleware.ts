// export { auth as middleware } from '@/auth';

// export const config = {
//   matcher: [
//     '/((?!api/auth|_next/static|_next/image|favicon.ico|login|public).*)',
//   ],
// };

export const middleware = (...res: any) => {
  console.log(res);
  return;
};
