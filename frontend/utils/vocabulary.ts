import { updateMemorizedStatus } from '@/app/api/vocabulary/route';
import { WordType } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { showFlashMessage } from './flashMessage';
import { getUserId } from './auth';

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
		showFlashMessage('覚えたステータスが更新されました', setFlashMessage);
	} catch {
		throw new Error('Failed to update memorized status');
	}
};

// 単語追加・編集処理
export const addOrEditVocabulary = async (
	newWord: WordType,
	vocabularies: WordType[],
	setVocabularies: Dispatch<SetStateAction<WordType[]>>,
	setFlashMessage: Dispatch<SetStateAction<string | null>>
) => {
	try {
		const userId = await getUserId();
		const isEdit = newWord.id ? true : false;
		const url = isEdit ? `${apiUrl}/api/vocabularies/${newWord.id}` : `${apiUrl}/api/vocabularies`;
		const method = isEdit ? 'PUT' : 'POST';
		const response = await fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ ...newWord, userId }),
		});
		if (!response.ok) {
			throw new Error('Failed to add vocabulary');
		}
		const addedOrUpdateWord = await response.json();

		if (isEdit) {
			setVocabularies(
				vocabularies.map((vocabulary) =>
					vocabulary.id === addedOrUpdateWord.id ? addedOrUpdateWord : vocabulary
				)
			);
		} else {
			setVocabularies([addedOrUpdateWord, ...vocabularies]);
		}

		// フラッシュメッセージを表示
		const message = isEdit ? '単語が更新されました' : '単語が追加されました';
		showFlashMessage(message, setFlashMessage);
	} catch {
		throw new Error('Failed to add vocabulary');
	}
};
