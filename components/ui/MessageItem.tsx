'use client';

import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { Message } from '@/types/messages';

interface MessageItemProps {
  message: Message;
  onRemove: (id: string) => void;
}

export const MessageItem = ({ message, onRemove }: MessageItemProps) => {
  const getIcon = () => {
    const iconClass = "w-5 h-5";
    switch (message.type) {
      case 'success': return <CheckCircle className={`${iconClass} text-green-500`} />;
      case 'error': return <AlertCircle className={`${iconClass} text-red-500`} />;
      case 'warning': return <AlertTriangle className={`${iconClass} text-yellow-500`} />;
      case 'info': return <Info className={`${iconClass} text-blue-500`} />;
    }
  };

  const getBgColor = () => {
    switch (message.type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`p-6 mx-2 rounded-lg border mb-3 shadow-2xl ${getBgColor()}`}>
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-medium text-gray-900">
                {message.title}
              </h4>
              {message.description && (
                <p className="text-sm text-gray-600 mt-1">
                  {message.description}
                </p>
              )}
            </div>
            <button
              onClick={() => onRemove(message.id)}
              className="text-gray-400 hover:text-gray-600 ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};