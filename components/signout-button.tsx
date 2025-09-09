'use client';

import { signOutAction } from '@/app/actions/auth-actions';
import { LogOut } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function SignOut() {
  return (
    <DropdownMenuItem onClick={signOutAction}>
      <LogOut className="text-sm w-full" />
      Log out
    </DropdownMenuItem>
  );
}
