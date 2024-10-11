// 時間まで表示させる
export function formatDate(dateString: string, withTime = false) {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hour = String(date.getHours()).padStart(2, '0');
	const minute = String(date.getMinutes()).padStart(2, '0');
	return `${year}/${month}/${day}` + (withTime ? ` ${hour}:${minute}` : '');
}
