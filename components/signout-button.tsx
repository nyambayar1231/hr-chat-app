'use client';

import { signOutAction } from '@/app/actions/auth-actions';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

export function SignOut() {
  return (
    <div className="w-full">
      <form action={signOutAction}>
        <Button variant="outline" size="sm" type="submit" className="w-full">
          <LogOut className="text-sm w-full" />
          Log out
        </Button>
      </form>
    </div>
  );
}
