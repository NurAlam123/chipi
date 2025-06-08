// place files you want to import through the `$lib` alias in this folder.
import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(...inputs));
}

export function getRelativeTimeFromISO(isoString: string) {
	const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
	const date = new Date(isoString);
	const now = new Date();
	const diff = (date.getTime() - now.getTime()) / 1000; // in seconds

	const units: [Intl.RelativeTimeFormatUnit, number][] = [
		['year', 60 * 60 * 24 * 365],
		['month', 60 * 60 * 24 * 30],
		['week', 60 * 60 * 24 * 7],
		['day', 60 * 60 * 24],
		['hour', 60 * 60],
		['minute', 60],
		['second', 1]
	];

	for (const [unit, seconds] of units) {
		const delta = diff / seconds;
		if (Math.abs(delta) >= 1) {
			return rtf.format(Math.round(delta), unit);
		}
	}

	return 'just now';
}
