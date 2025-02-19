import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilterSelectProps {
	filterOption: string;
	setFilterOption: (sortOption: string) => void;
}

export default function FileterSelect({ filterOption, setFilterOption }: FilterSelectProps) {
	const handleFIlterChange = (event: SelectChangeEvent<string>) => {
		setFilterOption(event.target.value);
	};

	return (
		<FormControl variant="outlined" sx={{ minWidth: 150 }}>
			<InputLabel id="filter-label" sx={{ background: 'white', borderRadius: 1 }}>
				絞り込み
			</InputLabel>
			<Select
				labelId="filter-label"
				value={filterOption}
				onChange={handleFIlterChange}
				label="絞り込み"
				sx={{ backgroundColor: 'white', color: 'black', height: '50px' }}
			>
				<MenuItem value="all">全て</MenuItem>
				<MenuItem value="favorite">お気に入り</MenuItem>
				<MenuItem value="memorized">覚えた</MenuItem>
				<MenuItem value="notMemorized">覚えてない</MenuItem>
			</Select>
		</FormControl>
	);
}
