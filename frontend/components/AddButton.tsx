import React from 'react';
import Button from '@mui/material/Button';

interface AddButtonProps {
	onClick: () => void;
	label: string;
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, label }) => {
	return (
		<Button variant="contained" color="primary" onClick={onClick}>
			{label}
		</Button>
	);
};

export default AddButton;
