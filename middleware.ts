// export { auth as middleware } from '@/auth';

export const middleware = (...res: any) => {
  console.log(res);
};

export const config = {
  matcher: [
    '/', // Homepage
    '/chat/:path*', // Chat routes
    '/api/chat', // Chat API
  ],
};
