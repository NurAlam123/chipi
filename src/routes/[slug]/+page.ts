import { title } from '$lib/stores.svelte';
import type { ConversationResponse } from '../../types/chat';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const sessionID = params.slug;
	const res = await fetch(`/api/conversations/${sessionID}`);
	const data: ConversationResponse = await res.json();
	if (data.conversation) title.set(data.conversation.title);
	return data;
};
