'use client';

import { getUserId } from '@/utils/auth';
import {
	Alert,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Snackbar,
	Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { showFlashMessage } from '@/utils/flashMessage';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const initialSettings = {
	word: true,
	meaning: true,
	partOfSpeech: true,
	pronunciation: true,
	exampleSentence: true,
	synonyms: true,
	antonyms: true,
	url: true,
	memorized: true,
};

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
	'&.Mui-checked': {
		backgroundColor: 'transparent',
	},
	'&:not(.Mui-checked)': {
		backgroundColor: 'transparent',
		padding: '12.5px',
	},
	'&:not(.Mui-checked) .MuiSvgIcon-root': {
		border: '1px solid #ccc',
		width: '16.5px',
		height: '16.5px',
		borderRadius: '2px',
	},
}));

export default function DisplayItemsettings() {
	const [settings, setSettings] = useState(initialSettings);
	const [flashMessage, setFlashMessage] = useState<string | null>(null);

	useEffect(() => {
		// 設定をAPIから読み込む
		const fetchSettings = async () => {
			try {
				const userId = await getUserId();
				const response = await fetch(`${apiUrl}/api/users/${userId}/settings/display`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (!response.ok) {
					throw new Error('Failed to fetch settings');
				}
				const data = await response.json();
				if (Object.keys(data).length > 0) {
					setSettings(data);
				} else {
					console.log('No settings found');
					setSettings(initialSettings);
				}
			} catch (error) {
				console.error('設定の取得に失敗しました', error);
			}
		};
		fetchSettings();
	}, []);

	// 設定の変更
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSettings({
			...settings,
			[event.target.name]: event.target.checked,
		});
	};

	const handleSave = async () => {
		try {
			const userId = await getUserId();
			console.log(settings);
			const response = await fetch(`${apiUrl}/api/users/${userId}/settings/display`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(settings),
			});
			if (!response.ok) {
				throw new Error('Failed to save settings');
			}
			const data = await response.json();
			console.log(data);
			if (data) {
				setSettings(data);
				showFlashMessage('設定が完了しました', setFlashMessage);
			}
		} catch (error) {
			showFlashMessage('設定の保存に失敗しました', setFlashMessage);
			console.error('設定の保存に失敗しました', error);
		}
	};

	return (
		<>
			<Box sx={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
				<Typography variant="h6" gutterBottom>
					単語登録の際の項目を表示・非表示設定
				</Typography>
				{Object.entries(settings).map(([key, value]) => (
					<FormControlLabel
						key={key}
						control={
							<CustomCheckbox checked={value} onChange={handleChange} name={key} color="primary" />
						}
						label={key}
					/>
				))}
				<Box sx={{ marginTop: 2 }}>
					<Button variant="contained" color="primary" onClick={handleSave}>
						保存
					</Button>
				</Box>
			</Box>
			<Snackbar open={!!flashMessage} autoHideDuration={3000} onClose={() => setFlashMessage(null)}>
				<Alert onClose={() => setFlashMessage(null)} severity="success" sx={{ width: '100%' }}>
					{flashMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
