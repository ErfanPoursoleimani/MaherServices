export interface Message {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  description?: string;
  duration?: number;
}

export interface CreateMessageParams {
  type: Message['type'];
  title: string;
  description?: string;
  duration?: number;
}