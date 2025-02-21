import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface FavoriteIconProps {
	isFavorite: boolean;
}

export default function FavoriteIcon({ isFavorite }: FavoriteIconProps) {
	return isFavorite ? <StarIcon color="primary" /> : <StarBorderIcon />;
}
