import PageTitle from '@/components/PageTitle';
import SessionButtons from '@/components/SessionButtons';
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Home() {
	console.log('TOP: server side rendering');
	const session = await getServerSession();
	return (
		<>
			<PageTitle title="トップページ" />
			<Box>
				<Link href="/vocabulary" passHref>
					単語一覧ページへ
				</Link>
			</Box>
			<Box>{!session && <SessionButtons session={session} />}</Box>
		</>
	);
}
