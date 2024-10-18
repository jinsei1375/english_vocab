import React from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';

interface LinkButtonProps {
	label: string;
	href: string;
}

const LinkButton: React.FC<LinkButtonProps> = ({ label, href }) => {
	return (
		<Link href={href} passHref legacyBehavior>
			<Button variant="contained" color="primary" sx={{ height: '40px' }} component="a">
				{label}
			</Button>
		</Link>
	);
};

export default LinkButton;
