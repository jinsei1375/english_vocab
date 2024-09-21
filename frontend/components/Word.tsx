import React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';
import { WordType } from '@/types';

interface WordProps {
  word: WordType;
  handleClick: (word: WordType) => void;
}

const Word: React.FC<WordProps> = ({ word, handleClick }) => {
  return (
    <Box
      key={word.id}
      sx={{
        flex: '1 1 calc(33.333% - 16px)',
        boxSizing: 'border-box',
        cursor: 'pointer',
      }}
      onClick={() => handleClick(word)}
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {word.word}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Word;
