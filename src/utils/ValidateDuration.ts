function validateDuration(str: string | number): boolean {
	const num = Number(str);
	return Number.isFinite(num) && num > 0;
}

export default validateDuration;
