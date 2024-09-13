'use client';

import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Checkbox,
	FormControlLabel,
} from '@mui/material';
import PartOfSpeechSelect from './PartOfSpeechSelect';

interface AddWordDialogProps {
	open: boolean;
	onClose: () => void;
	onAddWord: (
		word: string,
		meaning: string,
		partOfSpeech: string,
		pronunciation: string,
		exampleSentence: string,
		synonyms: string,
		antonyms: string,
		url: string,
		memorized: boolean
	) => void;
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

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		onAddWord(
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
		setWord('');
		setMeaning('');
		setPartOfSpeech('');
		setPronunciation('');
		setExampleSentence('');
		setSynonyms('');
		setAntonyms('');
		setUrl('');
		setMemorized(false);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">新しい単語を追加</DialogTitle>
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
					<PartOfSpeechSelect value={partOfSpeech} onChange={setPartOfSpeech} />
					<TextField
						margin="dense"
						label="発音記号"
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
						label="類義語"
						type="text"
						fullWidth
						value={synonyms}
						onChange={(e) => setSynonyms(e.target.value)}
					/>
					<TextField
						margin="dense"
						label="対義語"
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
							追加
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default AddWordDialog;
