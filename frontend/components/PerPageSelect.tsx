import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface PerPageSelectProps {
	filterOption: number;
	setFilterOption: (sortOption: number) => void;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PerPageSelect({
	filterOption,
	setFilterOption,
	setCurrentPage,
}: PerPageSelectProps) {
	// 件数変更
	const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
		setFilterOption(Number(event.target.value));
		setCurrentPage(1); // ページをリセット
	};

	return (
		<FormControl variant="outlined" sx={{ minWidth: 120, marginLeft: 2 }}>
			<InputLabel id="items-per-page-label" sx={{ background: 'white', borderRadius: 1 }}>
				表示数
			</InputLabel>
			<Select
				labelId="items-per-page-label"
				id="items-per-page"
				value={filterOption}
				onChange={handleItemsPerPageChange}
				label="表示数"
				sx={{ backgroundColor: 'white', color: 'black', height: '50px' }}
			>
				<MenuItem value={10}>10</MenuItem>
				<MenuItem value={20}>20</MenuItem>
				<MenuItem value={50}>50</MenuItem>
				<MenuItem value={100}>100</MenuItem>
			</Select>
		</FormControl>
	);
}
