import { Box, IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
	isSearchOpen: boolean;
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	handleSearchIconClick: () => void;
}

export default function SearchInput({
	isSearchOpen,
	searchQuery,
	setSearchQuery,
	handleSearchIconClick,
}: SearchInputProps) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
			<InputBase
				placeholder="検索"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				sx={{
					width: isSearchOpen ? '200px' : '0px',
					opacity: isSearchOpen ? 1 : 0,
					transition: 'width 0.3s, opacity 0.3s',
					backgroundColor: 'white',
					color: 'black',
					borderRadius: '4px',
					padding: isSearchOpen ? '0 8px' : '0',
					marginRight: isSearchOpen ? '8px' : '0',
					height: '50px',
				}}
			/>
			<IconButton onClick={handleSearchIconClick} sx={{ color: 'white' }}>
				<SearchIcon />
			</IconButton>
		</Box>
	);
}
