import React from 'react';
import { Box } from '@mui/material';
import { WordType } from '@/types';
import { Dispatch, SetStateAction } from 'react';

import WordCard from './WordCard';

interface WordCardListProps {
	words: WordType[];
	handleClick: (
		word: WordType | null,
		setSelectedWord: Dispatch<SetStateAction<WordType | null>>,
		setModalOpen: Dispatch<SetStateAction<boolean>>
	) => void;
	setSelectedWord: Dispatch<SetStateAction<WordType | null>>;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const WordList: React.FC<WordCardListProps> = ({
	words,
	handleClick,
	setSelectedWord,
	setModalOpen,
}) => {
	return (
		<Box
			sx={{
				display: 'grid',
				gridTemplateColumns: {
					sm: '1fr',
					md: '1fr 1fr',
					lg: '1fr 1fr 1fr',
				},
				gap: 2,
				width: '100%',
				maxWidth: '1200px',
				margin: 'auto',
			}}
		>
			{words.map((word) => (
				<WordCard
					key={word.id}
					word={word}
					handleClick={() => handleClick(word, setSelectedWord, setModalOpen)}
				></WordCard>
			))}
		</Box>
	);
};

export default WordList;
