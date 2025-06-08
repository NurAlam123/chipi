import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';

marked.setOptions({
	breaks: true,
	gfm: true
});

export async function renderMarkdownWithLatex(text: string): Promise<string> {
	if (!text) return '';

	// Replace escaped newlines with actual newlines
	text = text.replace(/\\n/g, '\n').replace(/\\t/g, '\t');

	// Render block math first
	text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
		try {
			return katex.renderToString(math, { displayMode: true });
		} catch {
			return match;
		}
	});

	// Render inline math
	text = text.replace(/\$([^$\n]+?)\$/g, (match, math) => {
		try {
			return katex.renderToString(math, { displayMode: false });
		} catch {
			return match;
		}
	});

	return marked.parse(text);
}
