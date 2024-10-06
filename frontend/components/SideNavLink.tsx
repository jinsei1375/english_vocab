import { ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

interface SideNavLinkProps {
	href: string;
	text: string;
	icon: React.ReactNode;
	toggleDrawer: (open: boolean) => void;
}

export default function SideNavLink({ href, text, icon, toggleDrawer }: SideNavLinkProps) {
	return (
		<Link href={href} passHref onClick={() => toggleDrawer(false)}>
			<ListItemButton>
				<ListItemText primary={text} />
			</ListItemButton>
		</Link>
	);
}
