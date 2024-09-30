import { Typography } from '@mui/material';

interface ReportItemProps {
	title: string;
	description: string;
}

export const ReportItem: React.FC<ReportItemProps> = ({ title, description }) => {
	return (
		<Typography variant="body1" gutterBottom>
			{title}:{description}
		</Typography>
	);
};
