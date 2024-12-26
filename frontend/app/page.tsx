import LinkButton from '@/components/LinkButton';
import PageTitle from '@/components/PageTitle';
import SessionButtons from '@/components/SessionButtons';
import { Box } from '@mui/material';
import { getServerSession } from 'next-auth';

export default async function Home() {
	const session = await getServerSession();
	return (
		<>
			<PageTitle title="English Vocab" />
			<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, marginTop: 8 }}>
				<LinkButton label="単語一覧" href="/vocabulary" />
				<LinkButton label="テスト" href="/test" />
			</Box>
			<Box>{!session && <SessionButtons session={session} />}</Box>
		</>
	);
}
