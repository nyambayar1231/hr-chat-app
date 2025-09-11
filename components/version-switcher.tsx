'use client';

import * as React from 'react';
import { BotMessageSquare, GalleryVerticalEnd } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

export function VersionSwitcher() {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex justify-between items-center w-full">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <BotMessageSquare className="w-5 h-5 text-primary-foreground" />
          </div>
          {state === 'expanded' && <SidebarTrigger />}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
