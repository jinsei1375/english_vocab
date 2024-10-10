import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SortSelectProps {
	sortOption: string;
	setSortOption: (sortOption: string) => void;
}

export default function SortSelect({ sortOption, setSortOption }: SortSelectProps) {
	const handleSortChange = (event: SelectChangeEvent<string>) => {
		setSortOption(event.target.value);
	};

	return (
		<FormControl variant="outlined" sx={{ minWidth: 200 }}>
			<InputLabel id="sort-label" sx={{ background: 'white', borderRadius: 1 }}>
				並び替え
			</InputLabel>
			<Select
				labelId="sort-label"
				value={sortOption}
				onChange={handleSortChange}
				label="並び替え"
				sx={{ backgroundColor: 'white', color: 'black', height: '50px' }}
			>
				<MenuItem value="createdAt">登録日順</MenuItem>
				<MenuItem value="updatedAt">更新日順</MenuItem>
				<MenuItem value="alphabetical">アルファベット順</MenuItem>
			</Select>
		</FormControl>
	);
}
