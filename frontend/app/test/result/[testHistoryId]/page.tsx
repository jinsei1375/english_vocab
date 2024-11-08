import { Box, Typography } from '@mui/material';
import { formatDate } from '@/utils/formatDate';
import { getTestHistory } from '@/app/api/user/route';
import TestDetailTable from '@/components/TestDetailTable';
import PageTitle from '@/components/PageTitle';

export default async function TestHistory({
	params,
}: {
	params: Promise<{ testHistoryId: number }>;
}) {
	const testHistoryId = (await params).testHistoryId;
	const testHistory = await getTestHistory(testHistoryId);

	if (!testHistory) {
		return (
			<Box sx={{ textAlign: 'center', marginTop: '20px' }}>
				<Typography variant="h4">テスト結果が見つかりませんでした。</Typography>
			</Box>
		);
	}

	return (
		<Box sx={{ textAlign: 'center' }}>
			<PageTitle title="テスト結果詳細" />
			<Typography variant="h6" sx={{ marginBottom: '16px' }}>
				テスト実施日時: {formatDate(testHistory.testDate, true)}
			</Typography>
			<TestDetailTable testHistory={testHistory} />
		</Box>
	);
}
