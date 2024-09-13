'use client';

import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface PartOfSpeechSelectProps {
	value: string;
	onChange: (value: string) => void;
}

interface PartOfSpeech {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

const PartOfSpeechSelect: React.FC<PartOfSpeechSelectProps> = ({ value, onChange }) => {
	const [options, setOptions] = useState<PartOfSpeech[]>([]);
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	useEffect(() => {
		const fetchOptions = async () => {
			const response = await fetch(`${apiUrl}/api/parts-of-speech`);
			const data = await response.json();
			setOptions(data);
		};

		fetchOptions();
	}, [apiUrl]);

	return (
		<FormControl fullWidth margin="dense">
			<InputLabel>品詞</InputLabel>
			<Select value={value} onChange={(e) => onChange(e.target.value as string)}>
				{options.map((option) => (
					<MenuItem key={option.id} value={option.name}>
						{option.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default PartOfSpeechSelect;
