import React, { useState } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
} from '@mui/material';

interface AddWordDialogProps {
	open: boolean;
	onClose: () => void;
	onAddWord: (word: string, meaning: string) => void;
}

const AddWordDialog: React.FC<AddWordDialogProps> = ({ open, onClose, onAddWord }) => {
	const [word, setWord] = useState('');
	const [meaning, setMeaning] = useState('');

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		onAddWord(word, meaning);
		setWord('');
		setMeaning('');
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
