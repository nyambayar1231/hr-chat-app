'use client';

import * as React from 'react';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import {
  Send,
  BotMessageSquare,
  User,
  ChevronDown,
  Wrench,
  Brain,
  ListPlus,
  FileText,
  FileSpreadsheet,
  FileCog,
} from 'lucide-react';
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
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { ChatTable } from './chatTable';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function ChatPage() {
  const { data: session } = useSession();
  const { messages = [], isLoading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = React.useState('Pro code Bot');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
                    {selectedModel === 'Pro code Bot' ? (
                      <Image
                        className="w-4 h-4 text-primary"
                        src={'/vs-code-24.png'}
                        width={16}
                        height={16}
                        alt="icon"
                      />
                    ) : selectedModel === 'Copilot Bot' ? (
                      <Image
                        className="w-4 h-4 text-primary"
                        src={'/microsoft-copilot-24.png'}
                        width={16}
                        height={16}
                        alt="icon"
                      />
                    ) : (
                      <ListPlus className="w-4 h-4 text-purple-600" />
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
                    <Brain className="w-4 h-4" />
                    AI Bots
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-200" />

                <DropdownMenuItem
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-green-50 focus:bg-green-50"
                  onClick={() => {
                    setSelectedModel('Pro code Bot');

                    const params = new URLSearchParams(searchParams.toString());
                    params.set('modelType', 'proCode');
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  <Image
                    className="w-4 h-4 text-primary"
                    src={'/vs-code-24.png'}
                    width={16}
                    height={16}
                    alt="icon"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-slate-700">
                      Pro code Bot
                    </div>
                  </div>
                  {selectedModel === 'Pro code Bot' && (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-slate-50 focus:bg-green-50"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());
                    params.set('modelType', 'copilot');
                    router.push(`${pathname}?${params.toString()}`);

                    setSelectedModel('Copilot Bot');
                  }}
                >
                  <Image
                    className="w-4 h-4 text-primary"
                    src={'/microsoft-copilot-24.png'}
                    width={16}
                    height={16}
                    alt="icon"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-slate-700 dark:text-slate-200">
                      Copilot Bot
                    </div>
                  </div>
                  {selectedModel === 'Copilot Bot' && (
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  )}
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="flex items-center gap-3 py-3 cursor-pointer hover:bg-slate-50 focus:bg-green-50"
                  onClick={() => {
                    setSelectedModel('Copilot + Pro code Bot');

                    const params = new URLSearchParams(searchParams.toString());
                    params.set('modelType', 'both');
                    router.push(`${pathname}?${params.toString()}`);
                  }}
                >
                  <ListPlus className="w-4 h-4 text-purple-600" />
                  <div className="flex-1">
                    <div className="font-medium text-slate-700 dark:text-slate-200">
                      Copilot + Pro code Bot
                    </div>
                  </div>
                  {selectedModel === 'Copilot + Pro code Bot' && (
                    <div className="w-2 h-2 bg-purple-600 rounded-full" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="w-[80%] max-w-2xl mx-auto flex-1 overflow-y-auto">
        <div className="mx-auto px-4 py-6">
          <div className="space-y-6">
            <h1 className="z-10 bg-gradient-to-r from-black via-pink-500 to-violet-800 inline-block text-transparent bg-clip-text font-normal text-5xl leading-tight">
              Hello, {session?.user?.name || 'there'}
            </h1>
            <br />
            <h1 className="z-10 bg-gradient-to-r from-black via-pink-500 to-violet-800 inline-block text-transparent bg-clip-text font-normal text-5xl -mt-2 mb-2 leading-tight">
              How can I help you?
            </h1>

            <p className="text-neutral-500 leading-tight tracking-tight mb-6 text-lg">
              Use one of the most common prompts below <br />
              or use one of your own prompt to begin
            </p>

            {messages.length > 0 &&
              messages.map((message, index) => {
                console.log(message);
                return (
                  <div
                    key={index}
                    className={`flex gap-4 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'system' && (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <BotMessageSquare className="w-4 h-4 text-primary-foreground" />
                      </div>
                    )}

                    <div className="flex flex-col space-y-4">
                      <Card
                        className={`max-w-[80%] p-4 ${
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border-border'
                        }`}
                      >
                        {message.contentType === 'table' && (
                          <ChatTable employeeData={message?.data} />
                        )}
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
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </Card>

                      {message.contentType === 'table' && (
                        <Card
                          className={`max-w-[80%] p-4 ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-card border-border'
                          }`}
                        >
                          {message.content}
                        </Card>
                      )}
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                        {session?.user?.image ? (
                          <Image
                            src={session.user.image}
                            alt="User profile"
                            width={28}
                            height={28}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <User className="w-4 h-4 text-secondary-foreground" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <BotMessageSquare className="w-4 h-4 text-primary-foreground" />
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

      <div className="w-[80%] max-w-2xl mx-auto border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto px-4 py-4">
          <div className="flex w-full mb-6 gap-3 text-sm text-neutral-800">
            <div className="group relative grow border border-ccc shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:bg-neutral-100/30 rounded-xl p-4 transition-all duration-300 ">
              Хүний нөөцийн бодлого журам
              <FileText className="w-4 h-4 text-primary absolute right-2 bottom-2" />
            </div>

            <div className="group relative grow border border-ccc shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:bg-neutral-100/30  rounded-xl p-4 transition-all duration-300">
              Хүний нөөцийн мэдээлэл
              <FileSpreadsheet className="w-4 h-4 text-primary absolute right-2 bottom-2" />
            </div>
            <div className="group relative grow border border-ccc shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:bg-neutral-100/30  rounded-xl p-4 transition-all duration-300">
              Цаг бүртгэлийн автоматжуулалт
              <FileCog className="w-4 h-4 text-primary absolute right-2 bottom-2" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Асуух зүйлээ бичнэ үү?"
              className="flex-1 bg-white border-border focus:ring-2 focus:ring-ring"
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
