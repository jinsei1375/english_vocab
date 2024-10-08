import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { WordType } from '@/types';
import Word from './Word';
import CheckIcon from '@mui/icons-material/Check';

interface WordListProps {
	words: WordType[];
	handleClick: (word: WordType) => void;
}

const WordList: React.FC<WordListProps> = ({ words, handleClick }) => {
	// ToDo リストをカード表示にする、スマホ時に100%表示にする
	return (
		<TableContainer sx={{ width: '80%', margin: 'auto' }}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<CheckIcon sx={{ color: 'green' }} />
						</TableCell>
						<TableCell sx={{ color: 'white' }}>単語</TableCell>
						<TableCell sx={{ color: 'white' }}>最終更新日</TableCell>
						<TableCell sx={{ color: 'white' }}>登録日</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{words.map((word) => (
						<Word key={word.id} word={word} handleClick={handleClick}></Word>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default WordList;
