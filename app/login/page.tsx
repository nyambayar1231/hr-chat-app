'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  // const session = await auth();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-6 text-center">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Continue with your Microsoft account
        </p>
        <Button
          className="w-full"
          onClick={() => signIn('microsoft-entra-id', { callbackUrl: '/chat' })}
        >
          Sign in with Microsoft
        </Button>
      </div>
    </div>
  );
}
