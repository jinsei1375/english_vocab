import LinkButton from '@/components/LinkButton';
import PageTitle from '@/components/PageTitle';
import { Box, Typography } from '@mui/material';
import { getTestHistories } from '../api/user/route';
import { formatDate } from '@/utils/formatDate';

export default async function Test() {
	console.log('Test');
	const testHistories = await getTestHistories();

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
				{testHistories &&
					testHistories.map((testHistory: any, index: number) => (
						<Box key={testHistory.id} style={{ margin: '1rem' }}>
							<Typography variant="h6" component="h3" gutterBottom>
								{index + 1}. {formatDate(testHistory.testDate, true)}
							</Typography>
						</Box>
					))}
			</Box>
		</>
	);
}
