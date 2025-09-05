import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Bot,
  MessageCircle,
  Zap,
  Shield,
  ArrowRight,
  Star,
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">AI Chat</span>
            </div>
            <Link href="/chat">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Chatting
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Experience Seamless
              <span className="text-primary block">Conversations with AI</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
              Unlock the power of intelligent conversations. Our AI chat
              assistant provides instant, accurate responses to help you
              accomplish more, faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3"
                >
                  Chat Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-3 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Our AI Chat?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make our AI assistant the perfect
              companion for your daily tasks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center bg-card border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">
                Natural Conversations
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Engage in fluid, natural conversations that feel human-like. Our
                AI understands context and provides relevant, helpful responses.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">
                Lightning Fast
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Get instant responses to your questions. Our optimized AI
                delivers answers in milliseconds, keeping your workflow
                uninterrupted.
              </p>
            </Card>

            <Card className="p-8 text-center bg-card border-border hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-4">
                Secure & Private
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your conversations are protected with enterprise-grade security.
                We prioritize your privacy and never store sensitive
                information.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied users who've transformed their
              productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-card-foreground mb-4 leading-relaxed">
                "This AI chat has revolutionized how I handle customer support.
                The responses are incredibly accurate and save me hours every
                day."
              </blockquote>
              <cite className="text-sm text-muted-foreground font-medium">
                — Sarah Chen, Customer Success Manager
              </cite>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-card-foreground mb-4 leading-relaxed">
                "The natural conversation flow is amazing. It feels like talking
                to a knowledgeable colleague who's always available to help."
              </blockquote>
              <cite className="text-sm text-muted-foreground font-medium">
                — Marcus Rodriguez, Product Designer
              </cite>
            </Card>

            <Card className="p-6 bg-card border-border">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-card-foreground mb-4 leading-relaxed">
                "I've tried many AI tools, but this one stands out for its
                reliability and ease of use. Highly recommend for any
                professional workflow."
              </blockquote>
              <cite className="text-sm text-muted-foreground font-medium">
                — Emily Watson, Marketing Director
              </cite>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
            Ready to Transform Your Conversations?
          </h2>
          <p className="text-xl mb-8 opacity-90 text-pretty">
            Join thousands of users who've already discovered the power of
            intelligent AI conversations. Start chatting today and experience
            the difference.
          </p>
          <Link href="/chat">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Chatting Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-accent text-accent-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-accent-foreground/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="text-xl font-bold">AI Chat</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:opacity-80 transition-opacity">
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Terms of Service
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                Contact
              </a>
            </div>
          </div>
          <div className="border-t border-accent-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
            © 2024 AI Chat. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
