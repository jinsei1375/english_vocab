import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box } from '@mui/material';
import { WordType } from '@/types';
import CheckIcon from '@mui/icons-material/Check';
import './WordModal.css';
import partOfSpeechIdToName from '@/utils/partOfSpeech';

interface WordModalProps {
  open: boolean;
  onClose: () => void;
  word: WordType | null;
  setSelectedWord: React.Dispatch<React.SetStateAction<WordType | null>>;
  handleMemorizedClick: (word: WordType) => void;
  handleEditClick: () => void;
  showDetails: boolean;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDelteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const WordModal: React.FC<WordModalProps> = ({
  open,
  onClose,
  word,
  setSelectedWord,
  handleMemorizedClick,
  handleEditClick,
  showDetails,
  setShowDetails,
  setOpenDelteConfirm,
}) => {
  const handleClose = () => {
    setShowDetails(false);
    setSelectedWord(null);
    onClose();
  };

  const handleUpdateMemorized = (word: WordType) => {
    handleMemorizedClick(word);
  };

  if (!word) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          minWidth: '500px', // モーダルの最小幅を設定
          minHeight: '300px', // モーダルの最小高さを設定
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
        },
      }}
    >
      <DialogContent sx={{ position: 'relative', minHeight: '300px' }}>
        <Box className={`flip-card ${showDetails ? 'flipped' : ''}`} sx={{ minHeight: '300px' }}>
          <Box className="flip-card-inner" sx={{ minHeight: '300px' }}>
            <Box className="flip-card-front">
              <DialogTitle sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box sx={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
                    {word.memorized && <CheckIcon sx={{ color: 'green' }} />}
                  </Box>
                  <Box sx={{ wordBreak: 'break-word', textAlign: 'center' }}>{word.word}</Box>
                </Box>
              </DialogTitle>
              <Box display="flex" justifyContent="center">
                <Button onClick={handleClose}>閉じる</Button>
                <Button onClick={() => setShowDetails(true)}>訳をみる</Button>
              </Box>
            </Box>
            <Box className="flip-card-back">
              <DialogTitle sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Box sx={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
                    {word.memorized && <CheckIcon sx={{ color: 'green' }} />}
                  </Box>
                  <Box sx={{ wordBreak: 'break-word', textAlign: 'center' }}>{word.word}</Box>
                </Box>
              </DialogTitle>
              <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
                意味: {word.meaning}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                品詞: {partOfSpeechIdToName(word.partOfSpeechId)}
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
                  <a target="_blank" rel="noopener noreferrer" href={word.url}>
                    {word.url}
                  </a>
                </Typography>
              )}
              <Box display="flex" justifyContent="center" mb={1}>
                <Button color="error" onClick={() => setOpenDelteConfirm(true)}>
                  削除する
                </Button>
                <Button color="primary" onClick={() => handleUpdateMemorized(word)}>
                  {word.memorized ? 'チェック外す' : '覚えた'}
                </Button>
                <Button color="primary" onClick={handleEditClick}>
                  編集する
                </Button>
              </Box>
              <Box display="flex" justifyContent="center">
                <Button onClick={handleClose}>閉じる</Button>
                <Button onClick={() => setShowDetails(false)}>戻る</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default WordModal;
