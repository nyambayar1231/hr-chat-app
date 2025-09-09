'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MessageSquare, Phone } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleMicrosoftLogin = async () => {
    setIsLoading(true);
    await signIn('microsoft-entra-id', { callbackUrl: '/' });

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground">
            Sign in to your AI Chat account
          </p>
        </div>

        <Card className="border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">Sign in</CardTitle>
            <CardDescription className="text-center">
              Choose your preferred sign-in method
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
              onClick={handleMicrosoftLogin}
              disabled={isLoading}
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#f25022" d="M1 1h10v10H1z" />
                <path fill="#00a4ef" d="M13 1h10v10H13z" />
                <path fill="#7fba00" d="M1 13h10v10H1z" />
                <path fill="#ffb900" d="M13 13h10v10H13z" />
              </svg>
              {isLoading ? 'Signing in...' : 'Continue with Microsoft'}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Утасны дугаараа оруулна уу"
                className="border-border"
              />
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                <Phone className="w-4 h-4 mr-2" />
                {isLoading ? 'Signing in...' : 'Continue with Phone'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account? &apos;
            <Link
              href="/signup"
              className="text-primary hover:text-primary/80 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
