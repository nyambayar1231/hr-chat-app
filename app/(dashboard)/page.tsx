'use client';

import * as React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, ChevronDown, Wrench } from 'lucide-react';
import { useChat } from '@/lib/hooks/useChat';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export default function ChatPage() {
  const { messages, isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = React.useState('General Modal');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input.trim());
    setInput('');
  };

  return (
    <main className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100 w-full">
      {/* Header */}
      <header className="flex justify-start border-b border-slate-200 bg-white/80 backdrop-blur-md shadow-sm z-10">
        <div className="max-w-4xl px-4 py-4">
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="min-w-[180px] justify-between bg-white border-slate-300 hover:bg-slate-50 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    {selectedModel === 'General Modal' ? (
                      <Bot className="w-4 h-4 text-primary" />
                    ) : (
                      <Wrench className="w-4 h-4 text-purple-600" />
                    )}

                    <span className="font-medium text-slate-700">
                      {selectedModel}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-56 bg-white border-slate-200 shadow-xl z-10"
                align="start"
              >
                <DropdownMenuLabel className="text-slate-600 font-semibold">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    AI Models
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-200" />

                <DropdownMenuItem
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-green-50 focus:bg-green-50"
                  onClick={() => setSelectedModel('General Modal')}
                >
                  <Bot className="w-4 h-4 text-primary" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-700">
                      General Modal
                    </div>
                  </div>
                  {selectedModel === 'General Modal' && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-slate-50 focus:bg-green-50"
                  onClick={() => setSelectedModel('Copilot Studio')}
                >
                  <Wrench className="w-4 h-4 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-700 dark:text-slate-200">
                      Copilot Studio
                    </div>
                  </div>
                  {selectedModel === 'Copilot Studio' && (
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="w-full flex-1 overflow-y-auto">
        <div className="mx-auto px-4 py-6">
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}

                <Card
                  className={`max-w-[80%] p-4 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border-border'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-2 opacity-70 ${
                      message.role === 'user'
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </Card>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <Card className="max-w-[80%] p-4 bg-card border-border">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      AI is thinking...
                    </span>
                  </div>
                </Card>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Асуух зүйлээ бичнэ үү?"
              className="flex-1 bg-input border-border focus:ring-2 focus:ring-ring"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Мэдээллээ баталаажуулна уу!
          </p>
        </div>
      </div>
    </main>
  );
}
