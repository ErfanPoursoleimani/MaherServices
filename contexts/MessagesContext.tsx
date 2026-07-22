'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Message, CreateMessageParams } from '@/types/messages';

interface MessagesContextType {
  messages: Message[];
  addMessage: (params: CreateMessageParams) => void;
  removeMessage: (id: string) => void;
  clearAll: () => void;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within MessagesProvider');
  }
  return context;
};

interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider = ({ children }: MessagesProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = useCallback((params: CreateMessageParams) => {
    const id = `msg-${Date.now()}-${Math.random().toString(36)}`;
    const duration = params.duration || 5000;

    const newMessage: Message = {
      id,
      type: params.type,
      title: params.title,
      description: params.description,
      duration,
    };

    setMessages(prev => [newMessage, ...prev]);

    // Auto remove
    if (duration > 0) {
      setTimeout(() => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
      }, duration);
    }
  }, []);

  const removeMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setMessages([]);
  }, []);

  return (
    <MessagesContext.Provider value={{ messages, addMessage, removeMessage, clearAll }}>
      {children}
    </MessagesContext.Provider>
  );
};