import PageTitle from '@/components/PageTitle';
import { ReportItem } from '@/components/ReportItem';
import { Box, Typography } from '@mui/material';

export default function Report() {
	console.log('rendering Report');
	return (
		<>
			<PageTitle title="記録" />
			<Box sx={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
				<ReportItem title={'会員登録日'} description={'2024/09/01'} />
				<ReportItem title={'登録した単語数'} description={'100語'} />
				<ReportItem title={'覚えた単語数'} description={'80語'} />
				<ReportItem title={'覚えていない単語数'} description={'20語'} />
			</Box>
		</>
	);
}
