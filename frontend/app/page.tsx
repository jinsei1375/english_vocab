import PageTitle from '@/components/PageTitle';
import SessionButtons from '@/components/SessionButtons';
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Home() {
	const session = await getServerSession();
	return (
		<>
			<PageTitle title="English Vocab" />
			<Box>
				<Link href="/vocabulary" passHref>
					単語一覧
				</Link>
			</Box>
			<Box>{!session && <SessionButtons session={session} />}</Box>
		</>
	);
}
