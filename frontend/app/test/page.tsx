import LinkButton from '@/components/LinkButton';
import PageTitle from '@/components/PageTitle';
import { Box, Typography } from '@mui/material';

export default async function Test() {
	console.log('Test');
	return (
		<>
			<PageTitle title="テスト" />
			<LinkButton label="テスト開始する" href="/test/start" />
			<Box>
				<Typography
					variant="h4"
					component="h2"
					align="center"
					gutterBottom
					style={{ fontSize: '1.5rem', margin: '1rem' }}
				>
					テスト履歴
				</Typography>
			</Box>
		</>
	);
}
