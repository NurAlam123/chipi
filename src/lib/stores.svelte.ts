import { writable } from 'svelte/store';

export const title = writable('');
export const brain = writable(false);
export const isAlive = writable(false);
