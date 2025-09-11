import { NextRequest } from 'next/server';

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  role: 'user' | 'system';
  content: string;
  conversationId?: string;
  contentType: 'text' | 'table';
  data?: Record<string, any>[];
  timestamp?: Date;
}

export interface ApiError {
  error: string;
  status?: number;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    // In production, this would be your domain
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: 'Unknown error' }));
        throw new Error(
          errorData.error || `HTTP error! status: ${response.status}`
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async sendChatMessage(message: string): Promise<ChatResponse> {
    return this.makeRequest<ChatResponse>('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  async getConversations<T = any>(): Promise<T> {
    return this.makeRequest<T>('/api/chat', {
      method: 'GET',
    });
  }

  async getConversationMessages<T = any>(sessionId: string): Promise<T> {
    const query = sessionId
      ? `?sessionId=${encodeURIComponent(sessionId)}`
      : '';
    return this.makeRequest<T>(`/api/chat/messages/${query}`, {
      method: 'GET',
    });
  }
}

export const apiService = new ApiService();
