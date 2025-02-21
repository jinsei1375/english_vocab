import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { WordType } from '@/types';
import CheckIcon from '@mui/icons-material/Check';
import FavoriteIcon from './FavoriteIcon';

interface WordCardProps {
	word: WordType;
	handleClick: () => void;
}

const Word: React.FC<WordCardProps> = ({ word, handleClick }) => {
	return (
		<Box key={word.id} sx={{ width: '100%', margin: '0', cursor: 'pointer' }} onClick={handleClick}>
			<Card sx={{ margin: '0', backgroundColor: 'white', color: '#333' }}>
				<CardContent sx={{ paddingBottom: '16px !important' }}>
					<Box display="flex" justifyContent="center" alignItems="center" position={'relative'}>
						<Box>
							<FavoriteIcon isFavorite={word.favorite} />
						</Box>
						<Box sx={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
							{word.memorized && <CheckIcon sx={{ color: 'green' }} />}
						</Box>
						<Box
							sx={{
								wordBreak: 'break-word',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								display: '-webkit-box',
								WebkitBoxOrient: 'vertical',
								WebkitLineClamp: 1, // 2行でテキストを省略
							}}
						>
							{word.word}
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Word;
