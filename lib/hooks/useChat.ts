import { useState, useCallback } from 'react';
import { apiService, ChatResponse } from '@/lib/api';
import { useSession } from 'next-auth/react';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  contentType: string;
  data?: Record<string, any>[];
}

export interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChat(): UseChatReturn {
  const { data: session } = useSession();

  const username = session?.user?.name;
  const firstname = username?.split(' ');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Сайн уу ${
        firstname?.[0] ?? ''
      }, Би таны ai туслах байна, асуух зүйлээ асууна уу.`,
      role: 'assistant',
      timestamp: new Date(),
      contentType: 'text',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        content: content.trim(),
        role: 'user',
        timestamp: new Date(),
        contentType: 'text',
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response: ChatResponse = await apiService.sendChatMessage(
          content.trim()
        );

        console.log({ response });

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.response || 'Уучлаарай, Та дахин оролдоно уу.',
          role: 'assistant',
          timestamp: new Date(),
          contentType: response.contentType,
        };

        setMessages((prev) => [...prev, aiMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);

        const errorResponseMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'Уучлаарай, алдаа гарлаа. Та дахин оролдоно уу.',
          role: 'assistant',
          timestamp: new Date(),
          contentType: 'text',
        };

        setMessages((prev) => [...prev, errorResponseMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: '1',
        content: 'Сайн уу? Би таны ai туслах байна, асуух зүйлээ асууна уу.',
        role: 'assistant',
        timestamp: new Date(),
      },
    ]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
}
