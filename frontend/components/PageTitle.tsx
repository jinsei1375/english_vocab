'use client';
import React from 'react';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/system';

interface PageTitleProps {
	title: string;
}

const Title = styled((props: TypographyProps) => <Typography {...props} />)(({ theme }) => ({
	fontSize: '2rem', // フォントサイズ
	fontWeight: 'bold', // フォントウェイト
	textAlign: 'center', // 中央揃え
	marginTop: '1rem', // 上マージン
}));

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
	return (
		<Title variant="h4" component="h1" gutterBottom>
			{title}
		</Title>
	);
};

export default PageTitle;
