'use client';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface BurgerIconProps {
	toggleDrawer: (open: boolean) => void;
}

export default function BurgerIcon({ toggleDrawer }: BurgerIconProps) {
	const handleClick = () => {
		toggleDrawer(true);
	};

	return (
		<IconButton
			edge="start"
			color="inherit"
			aria-label="menu"
			onClick={handleClick}
			sx={{ display: { xs: 'block', md: 'none' } }}
		>
			<MenuIcon />
		</IconButton>
	);
}
