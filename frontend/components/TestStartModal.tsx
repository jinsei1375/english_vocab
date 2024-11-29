'use client';
import LinkButton from '@/components/LinkButton';
import React, { useState } from 'react';
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
} from '@mui/material';

const TestStartModal: React.FC = () => {
	const [onlyUnmemorized, setOnlyUnmemorized] = useState(false);
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button color="primary" onClick={() => setOpen(true)}>
				テスト開始する
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>テスト開始オプション</DialogTitle>
				<DialogContent>
					<FormControlLabel
						control={
							<Checkbox
								checked={onlyUnmemorized}
								onChange={(e) => setOnlyUnmemorized(e.target.checked)}
								color="primary"
							/>
						}
						label="覚えていない単語限定"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} color="primary">
						キャンセル
					</Button>
					{onlyUnmemorized ? (
						<LinkButton label="開始" href="/test/start?onlyUnmemorized=true" />
					) : (
						<LinkButton label="開始" href="/test/start" />
					)}
				</DialogActions>
			</Dialog>
		</>
	);
};

export default TestStartModal;
