function formatAuthors(authors: string[] | null): string {
	return authors?.join(', ') ?? '';
}

export default formatAuthors;
