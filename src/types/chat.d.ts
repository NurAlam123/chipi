export interface Conversation {
	created_at: string;
	session_id: string;
	title: string;
	updated_at: string;
}

export interface Message {
	role: 'user' | 'assistant' | 'system';
	content: string;
	timestamp?: string;
	reasoning: string;
}

export interface ConversationResponse {
	conversation?: Conversation;
	messages: Message[];
}

export interface NewConversationResponse {
	session_id: string;
	message: string;
	title: string;
}
