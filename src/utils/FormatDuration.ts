function formatDuration(duration: number): string {
	if (!Number.isFinite(duration) || duration < 0) return '00:00 hours';

	const totalMinutes = Math.floor(duration);
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	const hh = String(hours).padStart(2, '0');
	const mm = String(minutes).padStart(2, '0');
	const label = hours === 1 ? 'hour' : 'hours';

	return `${hh}:${mm} ${label}`;
}

export default formatDuration;
