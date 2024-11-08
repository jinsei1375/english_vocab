import LinkButton from '@/components/LinkButton';
import PageTitle from '@/components/PageTitle';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { getTestHistories } from '../api/user/route';
import { formatDate } from '@/utils/formatDate';

export default async function Test() {
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
				<TableContainer component={Paper} sx={{ maxWidth: '700px', margin: '0 auto' }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>番号</TableCell>
								<TableCell>テスト日</TableCell>
								<TableCell>問題数</TableCell>
								<TableCell>正解数</TableCell>
								<TableCell></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{testHistories &&
								testHistories.map((testHistory: any, index: number) => (
									<TableRow key={testHistory.id}>
										<TableCell>{index + 1}</TableCell>
										<TableCell>{formatDate(testHistory.testDate, true)}</TableCell>
										<TableCell>{testHistory.testResults.length}</TableCell>
										<TableCell>
											{testHistory.testResults.filter((result: any) => result.isCorrect).length}
										</TableCell>
										<TableCell>
											<LinkButton label="詳細" href={`/test/result/${testHistory.id}`} />
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
}
