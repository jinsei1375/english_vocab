'use client';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import AddWordDialog from './AddWordDialog';
import { SessionProvider } from 'next-auth/react';

const VocabularyAdd = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddWord = (
    word: string,
    meaning: string,
    partOfSpeech: string,
    pronunciation: string,
    exampleSentence: string,
    synonyms: string,
    antonyms: string,
    url: string,
    memorized: boolean
  ) => {
    console.log(
      word,
      meaning,
      partOfSpeech,
      pronunciation,
      exampleSentence,
      synonyms,
      antonyms,
      url,
      memorized
    );
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        単語を追加
      </Button>
      <SessionProvider>
        <AddWordDialog open={open} onClose={handleClose} onAddWord={handleAddWord} />
      </SessionProvider>
    </>
  );
};

export default VocabularyAdd;
