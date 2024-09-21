import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from '@mui/material';
import { WordType } from '@/types';
import Link from 'next/link';

interface WordModalProps {
  open: boolean;
  onClose: () => void;
  word: WordType | null;
}

const WordModal: React.FC<WordModalProps> = ({ open, onClose, word }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!word) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{word.word}</DialogTitle>
      <DialogContent>
        {showDetails ? (
          <>
            <Typography variant="body2" color="text.secondary">
              意味: {word.meaning}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              品詞: {word.partOfSpeechId}
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
            {word.url && (
              <Typography variant="body2" color="text.secondary">
                URL:{' '}
                <Link href={word.url} target="_blank" rel="noopener">
                  {word.url}
                </Link>
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary">
              覚えた: {word.memorized ? 'はい' : 'いいえ'}
            </Typography>
            <Button onClick={() => setShowDetails(false)}>戻る</Button>
          </>
        ) : (
          <Button onClick={() => setShowDetails(true)}>訳をみる</Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WordModal;
