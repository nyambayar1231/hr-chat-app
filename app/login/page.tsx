'use client';

import { signIn, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  console.log({ session });

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      router.push('/');
    }
  }, [session, status, router]);

  // if (status === 'loading') {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center p-6">
  //       <div className="w-full max-w-sm space-y-6 text-center">
  //         <p>Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Continue with your Microsoft account
        </p>
        <Button
          className="w-full"
          onClick={() => signIn('microsoft-entra-id', { callbackUrl: '/' })}
        >
          Sign in with Microsoft
        </Button>
      </div>
    </div>
  );
}
