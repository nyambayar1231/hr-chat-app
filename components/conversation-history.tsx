'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { apiService } from '@/lib/api';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ConversationItem {
  session_id?: string | number;
  last_activity?: string;
  created_at?: string;
  //   title?: string;
}

export default function ConversationHistory() {
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await apiService.getConversations<
          ConversationItem[] | { data?: ConversationItem[] }
        >();
        const list = Array.isArray(data)
          ? data
          : (data as { data?: ConversationItem[] })?.data || [];

        if (isMounted) {
          setConversations(list);
        }
      } catch (err) {
        if (isMounted)
          setError(
            err instanceof Error ? err.message : 'Failed to load conversations'
          );
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SidebarContent>
      <SidebarMenu>
        {isLoading && (
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span>Loading conversations…</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
        {error && !isLoading && (
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span>Error: {error}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
        {!isLoading && !error && conversations.length === 0 && (
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span>No conversations yet</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}

        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            onClick={() => {
              window.location.href = '/';
            }}
          >
            <span>New chat</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {!isLoading &&
          !error &&
          conversations.map((item) => {
            const isActive = item.session_id === sessionId;
            return (
              <SidebarMenuItem
                key={String(item.session_id ?? item.created_at)}
                className={cn(isActive && 'bg-secondary rounded-sm text-white')}
              >
                <SidebarMenuButton
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('sessionId', String(item.session_id ?? ''));
                    router.push(`${pathname}?${params.toString()}`, {
                      scroll: false,
                    });
                  }}
                >
                  <span>
                    {new Date(item.created_at ?? '').toLocaleString()}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
      </SidebarMenu>
    </SidebarContent>
  );
}
