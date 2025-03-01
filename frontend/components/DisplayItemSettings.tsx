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

interface Setting {
	value: boolean;
	label: string;
}

interface Settings {
	[key: string]: Setting;
}

const initialSettings: Settings = {
	word: { value: true, label: '単語' },
	meaning: { value: true, label: '意味' },
	partOfSpeech: { value: true, label: '品詞' },
	pronunciation: { value: true, label: '発音' },
	exampleSentence: { value: true, label: '例文' },
	synonyms: { value: true, label: '同義語' },
	antonyms: { value: true, label: '反義語' },
	url: { value: true, label: 'URL' },
	memorized: { value: true, label: '覚えた' },
};

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
	'&.Mui-checked': {
		backgroundColor: 'transparent',
	},
	'&.Mui-checked svg': {
		fill: '#1976d2',
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

const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	'& .MuiFormControlLabel-label.Mui-disabled': {
		color: '#ccc',
		opacity: 0.7,
	},
}));

export default function DisplayItemsettings() {
	const [settings, setSettings] = useState(initialSettings);
	const [flashMessage, setFlashMessage] = useState<string | null>(null);

	const [userId, setUserId] = useState<number | null>(null);

	// クライアントサイドでデータをフェッチ
	useEffect(() => {
		const fetchUserId = async () => {
			const id = await getUserId();
			setUserId(id);
		};
		fetchUserId();
	}, []);

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
					const updatedSettings = { ...initialSettings };
					Object.keys(data).forEach((key) => {
						if (updatedSettings[key]) {
							updatedSettings[key].value = data[key];
						}
					});
					setSettings(updatedSettings);
				} else {
					console.log('No settings found');
					setSettings(initialSettings);
				}
			} catch (error) {
				console.error('設定の取得に失敗しました', error);
			}
		};
		fetchSettings();
	}, [userId]);

	// 設定の変更
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSettings({
			...settings,
			[event.target.name]: {
				...settings[event.target.name],
				value: event.target.checked,
			},
		});
	};

	const handleSave = async () => {
		try {
			const userId = await getUserId();
			const settingsToSave = Object.keys(settings).reduce(
				(acc, key) => {
					acc[key] = settings[key].value;
					return acc;
				},
				{} as Record<string, boolean>
			);
			const response = await fetch(`${apiUrl}/api/users/${userId}/settings/display`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(settingsToSave),
			});
			if (!response.ok) {
				throw new Error('Failed to save settings');
			}
			const data = await response.json();
			console.log(data);
			if (data) {
				const updatedSettings = { ...initialSettings };
				Object.keys(data).forEach((key) => {
					if (updatedSettings[key]) {
						updatedSettings[key].value = data[key];
					}
				});
				setSettings(updatedSettings);
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
					<br />
					<small>※word, meaningは表示必須です。</small>
				</Typography>
				{Object.entries(settings).map(([key, { value, label }]) => (
					<Box key={key}>
						<CustomFormControlLabel
							control={
								<CustomCheckbox
									checked={value}
									onChange={handleChange}
									name={key}
									color="primary"
									disabled={key === 'word' || key === 'meaning'}
								/>
							}
							label={label}
						/>
					</Box>
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
