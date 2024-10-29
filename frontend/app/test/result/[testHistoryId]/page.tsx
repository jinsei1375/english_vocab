import {
	Box,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import { formatDate } from '@/utils/formatDate';
import { getTestHistory } from '@/app/api/user/route';

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
		<Box sx={{ textAlign: 'center', marginTop: '20px' }}>
			<Typography variant="h4">テスト結果詳細</Typography>
			<Typography variant="h6" gutterBottom>
				テスト日: {formatDate(testHistory.testDate, true)}
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>番号</TableCell>
							<TableCell>単語</TableCell>
							<TableCell>正解/不正解</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{testHistory.testResults.map((result: any, index: number) => (
							<TableRow key={result.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{result.vocabulary.word}</TableCell>
								<TableCell>{result.isCorrect ? '◯' : '✖️'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
