import { useState, useCallback, useEffect } from 'react';
import { apiService, ChatResponse } from '@/lib/api';

import { useSearchParams } from 'next/navigation';

export interface ChatMessage {
  // id: string;
  role: 'user' | 'system';
  content: string;
  conversationId?: string | null;
  contentType: 'text' | 'table';
  data?: Record<string, any>[];
  timestamp: string;
}

export interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChat(): UseChatReturn {
  const searchParams = useSearchParams();
  const modelType = searchParams.get('modelType');
  const [selectedModel, setSelectedModel] = useState('proCode');

  // Get messages by conversationId
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const sessionId = searchParams.get('sessionId');

  useEffect(() => {
    setSelectedModel(modelType ?? 'proCode');
  }, [modelType]);

  useEffect(() => {
    try {
      apiService.getConversationMessages(sessionId ?? '').then((response) => {
        if (Object.keys(response).length > 0) {
          setMessages(response);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }, [sessionId]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        content: content.trim(),
        role: 'user',
        timestamp: new Date().toISOString(),
        contentType: 'text',
        conversationId: sessionId,
      };

      setMessages((prev = []) => {
        return [...prev, userMessage];
      });
      setIsLoading(true);
      setError(null);

      try {
        const endpoint =
          selectedModel === 'proCode' ? '/api/chat' : '/api/chat/copilot';

        const response: ChatResponse = await apiService.sendChatMessage(
          content.trim(),
          endpoint
        );

        const aiMessage: ChatMessage = {
          content: response.content,
          role: 'system',
          timestamp: new Date().toISOString(),
          contentType: response.contentType,
          data: response.data,
        };

        setMessages((prev = []) => [...prev, aiMessage]);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);

        const errorResponseMessage: ChatMessage = {
          content: 'Уучлаарай, алдаа гарлаа. Та дахин оролдоно уу.',
          role: 'system',
          timestamp: new Date().toISOString(),
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
        content: 'Сайн уу? Би таны ai туслах байна, асуух зүйлээ асууна уу.',
        role: 'system',
        timestamp: new Date().toISOString(),
        contentType: 'text',
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
