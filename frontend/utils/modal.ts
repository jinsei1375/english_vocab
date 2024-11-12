import { WordType } from '@/types';
import { Dispatch, SetStateAction } from 'react';

// モーダルの開閉処理
export const handleCloseModal = (
	setOpenForm: Dispatch<SetStateAction<boolean>>,
	setModalOpen: Dispatch<SetStateAction<boolean>>,
	setSelectedWord: Dispatch<SetStateAction<WordType | null>>,
	setShowDetails: Dispatch<SetStateAction<boolean>>,
	setOpenDeleteConfirm: Dispatch<SetStateAction<boolean>>
) => {
	setOpenForm(false);
	setModalOpen(false);
	setSelectedWord(null);
	setShowDetails(false);
	setOpenDeleteConfirm(false);
};

// 単語の選択処理
export const handleWordClick = (
	word: WordType | null,
	setSelectedWord: Dispatch<SetStateAction<WordType | null>>,
	setModalOpen: Dispatch<SetStateAction<boolean>>
) => {
	setSelectedWord(word);
	setModalOpen(true);
};

// 編集ボタンクリック
export const handleEditClick = (setOpenForm: Dispatch<SetStateAction<boolean>>) => {
	setOpenForm(true);
};
