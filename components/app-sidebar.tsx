'use client';

import { Calendar, Home, Inbox, Search, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { VersionSwitcher } from './version-switcher';
import { NavUser } from './nav-user';
import { useSession } from 'next-auth/react';
import ConversationHistory from './conversation-history';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <VersionSwitcher />
      </SidebarHeader>

      <ConversationHistory />
      <SidebarFooter>
        <NavUser user={session?.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
