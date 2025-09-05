'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration. Check if your options are correct.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to sign in.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      case 'Default':
        return 'An error occurred during authentication.';
      default:
        return 'An unknown error occurred during authentication.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-semibold text-destructive mb-4">
          Authentication Error
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          {getErrorMessage(error)}
        </p>
        {error && (
          <div className="mb-4 p-3 bg-muted rounded-md">
            <p className="text-xs font-mono text-muted-foreground">
              Error code: {error}
            </p>
          </div>
        )}
        <Button
          onClick={() => (window.location.href = '/login')}
          className="w-full"
        >
          Try Again
        </Button>
      </Card>
    </div>
  );
}
