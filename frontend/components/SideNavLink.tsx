import { ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

interface SideNavLinkProps {
	href: string;
	text: string;
	toggleDrawer: (open: boolean) => void;
}

export default function SideNavLink({ href, text, toggleDrawer }: SideNavLinkProps) {
	return (
		<Link href={href} passHref onClick={() => toggleDrawer(false)}>
			<ListItemButton>
				<ListItemText primary={text} />
			</ListItemButton>
		</Link>
	);
}
