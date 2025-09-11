export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
  contentType: string;
  data: Record<string, any>[];
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
}

export const apiService = new ApiService();
