import { WordType } from '@/types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';

interface WordDeleteConfirmDialogProps {
  open: boolean;
  setOpenDelteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (wordId: number | undefined) => Promise<void>;
  selectedWord: WordType | null;
}

const WordDeleteConfirmDialog: React.FC<WordDeleteConfirmDialogProps> = ({
  open,
  setOpenDelteConfirm,
  onDelete,
  selectedWord,
}) => {
  const handleDelete = (selectedWordId: number | undefined) => {
    onDelete(selectedWordId);
  };
  return (
    <Dialog open={open}>
      <DialogTitle>単語を削除しますか？</DialogTitle>
      <DialogContent>この操作は元に戻せません。本当に削除しますか？</DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setOpenDelteConfirm(false)}>
          キャンセル
        </Button>
        <Button onClick={() => handleDelete(selectedWord?.id)} color="secondary">
          削除する
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WordDeleteConfirmDialog;
