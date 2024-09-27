// partOfSpeechのidからnameを取得する
export default function partOfSpeechIdToName(id: number) {
	switch (id) {
		case 1:
			return '名詞';
		case 2:
			return '動詞';
		case 3:
			return '形容詞';
		case 4:
			return '副詞';
		case 5:
			return '代名詞';
		case 6:
			return '前置詞';
		case 7:
			return '接続詞';
		case 8:
			return 'フレーズ';
		default:
			return '';
	}
}
