'use client';
import React, { useEffect, useState } from 'react';
import AddWordDialog from '@/components/AddWordDialog';
import WordList from '@/components/WordList';
import PageTitle from '@/components/PageTitle';
import AddButton from '@/components/AddButton';
import { WordType } from '@/types';
import { Alert, Box, CircularProgress, Snackbar } from '@mui/material';
import { getUserId } from '@/utils/auth';
import WordModal from '@/components/WordModal/WordModal';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Vocabulary() {
  const [open, setOpen] = useState(false);
  const [vocabularies, setVocabularies] = useState<WordType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWord, setSelectedWord] = useState<WordType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState<string | null>(null);

  // クライアントサイドでデータをフェッチ
  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const userId = await getUserId();

        // 単語一覧を取得
        const vocabulariesResponse = await fetch(`${apiUrl}/api/vocabularies/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!vocabulariesResponse.ok) {
          throw new Error('Failed to fetch vocabularies');
        }
        const vocabularies = await vocabulariesResponse.json();
        setVocabularies(vocabularies);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVocabularies();
  }, []);

  // 新しい単語を追加
  const handleAddWord = async (newWord: WordType) => {
    try {
      const userId = await getUserId();
      const response = await fetch(`${apiUrl}/api/vocabulary/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newWord, userId }),
      });
      if (!response.ok) {
        throw new Error('Failed to add vocabulary');
      }
      const addedWord = await response.json();

      // 新しい単語をローカルの状態に追加
      setVocabularies([...vocabularies, addedWord]);
      // フラッシュメッセージを表示
      setFlashMessage('単語が追加されました');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unknown error occurred');
      }
    }
    setOpen(false);
  };

  const handleCardClick = (word: WordType) => {
    setSelectedWord(word);
    setModalOpen(true);
  };

  return (
    <>
      <PageTitle title="単語一覧" />
      {/* 単語追加 */}
      <AddButton onClick={() => setOpen(true)} label="単語追加" />
      {/* 単語一覧 */}
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '50px',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <WordList words={vocabularies} handleClick={handleCardClick} />
      )}
      <AddWordDialog open={open} onClose={() => setOpen(false)} onAddWord={handleAddWord} />
      <WordModal open={modalOpen} onClose={() => setModalOpen(false)} word={selectedWord} />
      <Snackbar open={!!flashMessage} autoHideDuration={3000} onClose={() => setFlashMessage(null)}>
        <Alert onClose={() => setFlashMessage(null)} severity="success" sx={{ width: '100%' }}>
          {flashMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
