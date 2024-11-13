import { updateMemorizedStatus } from '@/app/api/vocabulary/route';
import { WordType } from '@/types';
import { Dispatch, SetStateAction } from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// 覚えたボタンクリック処理
export const handleMemorizedClick = async (
	word: WordType,
	vocabularies: WordType[],
	setVocabularies: Dispatch<SetStateAction<WordType[]>>,
	setSelectedWord: Dispatch<SetStateAction<WordType | null>>,
	setFlashMessage: Dispatch<SetStateAction<string | null>>
) => {
	try {
		const updatedWord = await updateMemorizedStatus(word);
		// 更新された単語をローカルの状態に反映
		const updatedVocabularies = vocabularies.map((vocabulary) =>
			vocabulary.id === updatedWord.id ? updatedWord : vocabulary
		);
		setVocabularies(updatedVocabularies);
		setSelectedWord(updatedWord);
		// フラッシュメッセージを表示
		setFlashMessage('覚えたステータスが更新されました');
	} catch {
		throw new Error('Failed to update memorized status');
	}
};
