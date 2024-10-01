import PageTitle from '@/components/PageTitle';
import { ReportItem } from '@/components/ReportItem';
import { Box } from '@mui/material';
import { fetchReportData } from '../api/report/route';
import { formatDate } from '@/utils/formatDate';

export default async function Report() {
	console.log('rendering Report');
	const { registrationDate, registeredWords, learnedWords, notLearnedWords } =
		await fetchReportData();
	console.log('registrationDate:', registrationDate);
	return (
		<>
			<PageTitle title="記録" />
			<Box sx={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
				<ReportItem title={'会員登録日'} description={formatDate(registrationDate)} />
				<ReportItem title={'登録した単語数'} description={registeredWords} />
				<ReportItem title={'覚えた単語数'} description={learnedWords} />
				<ReportItem title={'覚えていない単語数'} description={notLearnedWords} />
			</Box>
		</>
	);
}
