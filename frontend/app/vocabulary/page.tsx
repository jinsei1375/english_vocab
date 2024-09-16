import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddWordDialog from '@/components/AddWordDialog';
import WordList from '@/components/WordList';
import PageTitle from '@/components/PageTitle';
import { getAllVocabularies } from '../api/vocabulary/route';

export default async function Vocabulary() {
	console.log('vocab: server side rendering');
	const vocabularies = await getAllVocabularies();

	return (
		<>
			<PageTitle title="単語一覧" />
			{/* <Button variant="contained" color="primary" onClick={handleClickOpen}>
				単語を追加
			</Button> */}
			<WordList words={vocabularies} />
			{/* <AddWordDialog open={open} onClose={handleClose} onAddWord={handleAddWord} /> */}
		</>
	);
}
