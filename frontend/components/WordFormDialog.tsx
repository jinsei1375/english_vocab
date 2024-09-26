import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { PartOfSpeech, WordType } from '@/types';
import { fetchPartOfSpeech } from '@/app/api/vocabulary/route';
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';

interface WordFormDialogProps {
	open: boolean;
	onClose: () => void;
	onAddWord: (newWord: WordType) => void;
	initialWord?: WordType | null;
}

const WordFormDialog: React.FC<WordFormDialogProps> = ({
	open,
	onClose,
	onAddWord,
	initialWord,
}) => {
	const [word, setWord] = useState(initialWord?.word ?? '');
	const [meaning, setMeaning] = useState(initialWord?.meaning ?? '');
	const [partOfSpeech, setPartOfSpeech] = useState(initialWord?.partOfSpeechId ?? '');
	const [pronunciation, setPronunciation] = useState(initialWord?.pronunciation ?? '');
	const [exampleSentence, setExampleSentence] = useState(initialWord?.exampleSentence ?? '');
	const [synonyms, setSynonyms] = useState(initialWord?.synonyms ?? '');
	const [antonyms, setAntonyms] = useState(initialWord?.antonyms ?? '');
	const [url, setUrl] = useState(initialWord?.url ?? '');
	const [memorized, setMemorized] = useState(initialWord?.memorized ?? false);
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

	useEffect(() => {
		if (initialWord) {
			setWord(initialWord.word ?? '');
			setMeaning(initialWord.meaning ?? '');
			setPartOfSpeech(initialWord.partOfSpeechId ?? '');
			setPronunciation(initialWord.pronunciation ?? '');
			setExampleSentence(initialWord.exampleSentence ?? '');
			setSynonyms(initialWord.synonyms ?? '');
			setAntonyms(initialWord.antonyms ?? '');
			setUrl(initialWord.url ?? '');
			setMemorized(initialWord.memorized ?? false);
		} else {
			setWord('');
			setMeaning('');
			setPartOfSpeech('');
			setPronunciation('');
			setExampleSentence('');
			setSynonyms('');
			setAntonyms('');
			setUrl('');
			setMemorized(false);
		}
	}, [initialWord]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		const newWord: WordType = {
			id: initialWord?.id,
			word,
			meaning,
			partOfSpeechId: partOfSpeech,
			pronunciation,
			exampleSentence,
			synonyms,
			antonyms,
			url,
			memorized: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		onAddWord(newWord);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle textAlign="center">{initialWord ? '単語を編集' : '単語を追加'}</DialogTitle>
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
					<FormControl fullWidth margin="dense">
						<InputLabel id="part-of-speech-label">品詞</InputLabel>
						<Select
							labelId="part-of-speech-label"
							value={partOfSpeech}
							onChange={(e) => setPartOfSpeech(e.target.value as string)}
						>
							{partOfSpeechList.map((pos) => (
								<MenuItem key={pos.id} value={pos.name}>
									{pos.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
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
					<FormControlLabel
						control={
							<Checkbox
								checked={memorized}
								onChange={(e) => setMemorized(e.target.checked)}
								color="primary"
							/>
						}
						label="覚えた"
					/>
					<DialogActions>
						<Button onClick={onClose} color="primary">
							キャンセル
						</Button>
						<Button type="submit" color="primary">
							{initialWord ? '更新' : '追加'}
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default WordFormDialog;
