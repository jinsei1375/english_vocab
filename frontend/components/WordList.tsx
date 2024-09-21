import React from 'react';
import { Box } from '@mui/material';
import { WordType } from '@/types';
import Word from './Word';

interface WordListProps {
  words: WordType[];
  handleClick: (word: WordType) => void;
}

const WordList: React.FC<WordListProps> = ({ words, handleClick }) => {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {words.map((word) => (
          <Word key={word.id} word={word} handleClick={handleClick} />
        ))}
      </Box>
    </Box>
  );
};

export default WordList;
