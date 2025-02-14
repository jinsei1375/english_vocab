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

interface TestStartModalProps {
	vocabularyCount: number;
}

export default function TestStartModal({ vocabularyCount }: TestStartModalProps) {
	const [onlyUnmemorized, setOnlyUnmemorized] = useState(false);
	const [open, setOpen] = useState(false);

	return (
		<Box sx={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
			{vocabularyCount < 10 ? (
				'※10単語以上登録してください'
			) : (
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
								<LinkButton label="開始" href="/test/start?onlyUnmemorized=false" />
							)}
						</DialogActions>
					</Dialog>
				</>
			)}
		</Box>
	);
}
