import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { PartOfSpeech, WordType } from '@/types';
import { fetchPartOfSpeech } from '@/app/api/vocabulary/route';
import { MenuItem, Select } from '@mui/material';

interface AddWordDialogProps {
  open: boolean;
  onClose: () => void;
  onAddWord: (newWord: WordType) => void;
}

const AddWordDialog: React.FC<AddWordDialogProps> = ({ open, onClose, onAddWord }) => {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  const [synonyms, setSynonyms] = useState('');
  const [antonyms, setAntonyms] = useState('');
  const [url, setUrl] = useState('');
  const [memorized, setMemorized] = useState(false);
  const [partOfSpeechList, setPartOfSpeechList] = useState<PartOfSpeech[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: PartOfSpeech[] = await fetchPartOfSpeech();
        setPartOfSpeechList(data);
      } catch (error) {
        console.error('Failed to fetch part of speech:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newWord: WordType = {
      word,
      meaning,
      partOfSpeechId: partOfSpeech,
      pronunciation,
      exampleSentence,
      synonyms,
      antonyms,
      url,
      memorized: false,
    };
    onAddWord(newWord);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>単語を追加</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="単語"
            type="text"
            fullWidth
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <TextField
            margin="dense"
            label="意味"
            type="text"
            fullWidth
            value={meaning}
            onChange={(e) => setMeaning(e.target.value)}
          />
          <Select
            margin="dense"
            label="品詞"
            fullWidth
            value={partOfSpeech}
            onChange={(e) => setPartOfSpeech(e.target.value as string)}
          >
            {partOfSpeechList.map((pos) => (
              <MenuItem key={pos.id} value={pos.name}>
                {pos.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            margin="dense"
            label="発音"
            type="text"
            fullWidth
            value={pronunciation}
            onChange={(e) => setPronunciation(e.target.value)}
          />
          <TextField
            margin="dense"
            label="例文"
            type="text"
            fullWidth
            value={exampleSentence}
            onChange={(e) => setExampleSentence(e.target.value)}
          />
          <TextField
            margin="dense"
            label="同義語"
            type="text"
            fullWidth
            value={synonyms}
            onChange={(e) => setSynonyms(e.target.value)}
          />
          <TextField
            margin="dense"
            label="反義語"
            type="text"
            fullWidth
            value={antonyms}
            onChange={(e) => setAntonyms(e.target.value)}
          />
          <TextField
            margin="dense"
            label="URL"
            type="text"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <DialogActions>
            <Button onClick={onClose} color="primary">
              キャンセル
            </Button>
            <Button type="submit" color="primary">
              追加
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddWordDialog;
