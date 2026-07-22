'use client';

import { useMessages } from '@/contexts/MessagesContext';
import { MessageItem } from './MessageItem';
import { Message } from '@/types/messages';

interface MessagesContainerProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | "bottom-center" | "top-center";
}

export const MessagesContainer = ({ position = 'top-right' }: MessagesContainerProps) => {
  const { messages, removeMessage } = useMessages();

  if (messages.length === 0) return null;

  const getPositionClass = () => {
    switch (position) {
      case 'top-left': return 'top-4 left-4';
      case 'bottom-right': return 'bottom-4 right-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'top-center': return 'top-4 left-1/2 -translate-x-1/2';
      case 'bottom-center': return 'bottom-4 left-1/2 -translate-x-1/2';
      default: return 'top-4 right-4';
    }
  };

  return (
    <div className={`fixed ${getPositionClass()} z-50 max-w-md w-full`}>
      {messages.map((message: Message) => (
        <MessageItem
          key={message.id}
          message={message}
          onRemove={removeMessage}
        />
      ))}
    </div>
  );
};