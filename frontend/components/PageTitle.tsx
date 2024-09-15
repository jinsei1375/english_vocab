import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

interface PageTitleProps {
  title: string;
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '2rem', // フォントサイズ
    fontWeight: 'bold', // フォントウェイト
    textAlign: 'center', // 中央揃え
    marginTop: '1rem', // 上マージン
  },
}));

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography variant="h4" component="h1" className={classes.title} gutterBottom>
      {title}
    </Typography>
  );
};

export default PageTitle;
