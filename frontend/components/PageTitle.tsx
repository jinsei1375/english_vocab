import React from 'react';
import Typography from '@mui/material/Typography';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return (
    <Typography
      variant="h4"
      component="h1"
      align="center"
      gutterBottom
      style={{ fontSize: '2rem', margin: '1rem' }}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;
