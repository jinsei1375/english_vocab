import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.post('/vocabulary/add', async (req, res) => {
  const {
    word,
    meaning,
    partOfSpeech,
    pronunciation,
    exampleSentence,
    synonyms,
    antonyms,
    url,
    userId,
  } = req.body;
  try {
    console.log('req.body:', req.body);
    const newWord = await prisma.vocabulary.create({
      data: {
        word,
        meaning,
        partOfSpeech,
        pronunciation,
        exampleSentence,
        synonyms,
        antonyms,
        url,
        memorized: false,
        userId,
      },
    });
    res.status(200).json(newWord);
  } catch (error) {
    console.error('Error during word creation:', error);
    res.status(500).json({ error: '単語の登録に失敗しました。' });
  }
});

router.get('/parts-of-speech', async (req, res) => {
  try {
    const partsOfSpeech = await prisma.partOfSpeech.findMany();
    res.status(200).json(partsOfSpeech);
  } catch (error) {
    console.error('Error fetching parts of speech:', error);
    res.status(500).json({ error: '品詞カテゴリの取得に失敗しました。' });
  }
});

router.get('/vocabularies', async (req, res) => {
  try {
    const vocabularies = await prisma.vocabulary.findMany();
    res.status(200).json(vocabularies);
  } catch (error) {
    console.error('Error fetching parts of speech:', error);
    res.status(500).json({ error: '品詞カテゴリの取得に失敗しました。' });
  }
});

router.get('/vocabularies/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const vocabularies = await prisma.vocabulary.findMany({
      where: { userId: userId as number },
    });
    res.status(200).json(vocabularies);
  } catch (error) {
    console.error('Error fetching user vocabularies:', error);
    res.status(500).json({ error: '単語取得に失敗しました' });
  }
});

export default router;
