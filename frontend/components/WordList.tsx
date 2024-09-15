import React from 'react';
import { Card, CardContent, Typography, Link, Box } from '@mui/material';

interface Word {
  id: number;
  word: string;
  meaning: string;
  partOfSpeech: string;
  pronunciation: string;
  exampleSentence: string;
  synonyms: string;
  antonyms: string;
  url: string;
  memorized: boolean;
}

interface WordListProps {
  words: Word[];
}

const WordList: React.FC<WordListProps> = ({ words }) => {
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
          <Box
            key={word.id}
            sx={{
              flex: '1 1 calc(33.333% - 16px)',
              boxSizing: 'border-box',
            }}
          >
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {word.word}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  意味: {word.meaning}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  品詞: {word.partOfSpeech}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  発音記号: {word.pronunciation}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  例文: {word.exampleSentence}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  類義語: {word.synonyms}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  対義語: {word.antonyms}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  URL:{' '}
                  <Link href={word.url} target="_blank" rel="noopener">
                    {word.url}
                  </Link>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  覚えた: {word.memorized ? 'はい' : 'いいえ'}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WordList;
