function formatDate(date: string | null): string {
	return date?.replaceAll('/', '.') ?? '';
}

export default formatDate;
