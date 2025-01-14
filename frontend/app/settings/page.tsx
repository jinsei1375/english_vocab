import PageTitle from '@/components/PageTitle';
import { ListItemButton, ListItemText } from '@mui/material';
import Link from 'next/link';

export default async function Settings() {
	return (
		<>
			<PageTitle title="設定" />
			<Link href="/settings/display_item" passHref>
				<ListItemButton>
					<ListItemText primary="表示項目" />
				</ListItemButton>
			</Link>
		</>
	);
}
