import React, { useState } from 'react';
import AddWordDialog from '@/components/AddWordDialog';
import WordList from '@/components/WordList';
import PageTitle from '@/components/PageTitle';
import { getUserVocabularies } from '../api/vocabulary/route';
import VocabularyAdd from '@/components/VocabularyAdd';

export default async function Vocabulary() {
  console.log('vocab: server side rendering');
  const vocabularies = await getUserVocabularies();

  return (
    <>
      <PageTitle title="単語一覧" />
      {/* 単語追加 */}
      <VocabularyAdd />
      {/* 単語一覧 */}
      <WordList words={vocabularies} />
    </>
  );
}
