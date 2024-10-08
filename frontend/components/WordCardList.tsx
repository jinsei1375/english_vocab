import React from 'react';
import { Box } from '@mui/material';
import { WordType } from '@/types';

import WordCard from './WordCard';

interface WordCardListProps {
	words: WordType[];
	handleClick: (word: WordType) => void;
}

const WordList: React.FC<WordCardListProps> = ({ words, handleClick }) => {
	// ToDo リストをカード表示にする、スマホ時に100%表示にする
	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				gap: 0,
				width: '100%',
				maxWidth: '400px',
				margin: 'auto',
			}}
		>
			{words.map((word) => (
				<WordCard key={word.id} word={word} handleClick={handleClick}></WordCard>
			))}
		</Box>
	);
};

export default WordList;
