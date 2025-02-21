import { IconButton } from '@mui/material';
import FavoriteIcon from './FavoriteIcon';

interface FavoriteIconButtonProps {
	isFavorite: boolean;
	handlefavoriteClick: () => Promise<void>;
}

export default function FavoriteIconButton({
	isFavorite,
	handlefavoriteClick,
}: FavoriteIconButtonProps) {
	return (
		<IconButton onClick={handlefavoriteClick} sx={{ padding: 0 }}>
			<FavoriteIcon isFavorite={isFavorite} />
		</IconButton>
	);
}
