import PageTitle from '@/components/PageTitle';
import { Box, ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

export default async function Settings() {
	return (
		<Box sx={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
			<PageTitle title="設定" />
			<Link href="/settings/display_item" passHref>
				<ListItemButton>
					<ListItemText primary="表示項目" />
				</ListItemButton>
			</Link>
		</Box>
	);
}
