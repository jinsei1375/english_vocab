import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.post('/vocabulary/add', async (req, res) => {
	const {
		word,
		meaning,
		partOfSpeechId,
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
				partOfSpeechId,
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

// 編集処理
router.put('/vocabulary/edit', async (req, res) => {
	const {
		id,
		word,
		meaning,
		partOfSpeechId,
		pronunciation,
		exampleSentence,
		synonyms,
		antonyms,
		url,
		memorized,
		userId,
	} = req.body;
	try {
		console.log('req.body:', req.body);
		const updatedWord = await prisma.vocabulary.update({
			where: { id },
			data: {
				word,
				meaning,
				partOfSpeechId,
				pronunciation,
				exampleSentence,
				synonyms,
				antonyms,
				url,
				memorized,
				userId,
			},
		});
		res.status(200).json(updatedWord);
	} catch (error) {
		console.error('Error during word update:', error);
		res.status(500).json({ error: '単語の更新に失敗しました。' });
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
			orderBy: { updatedAt: 'desc' },
		});
		res.status(200).json(vocabularies);
	} catch (error) {
		console.error('Error fetching user vocabularies:', error);
		res.status(500).json({ error: '単語取得に失敗しました' });
	}
});

router.post('/vocabulary/memorized', async (req, res) => {
	const { id, memorized } = req.body;
	try {
		const updatedWord = await prisma.vocabulary.update({
			where: { id: id as number },
			data: { memorized: memorized as boolean },
		});
		res.status(200).json(updatedWord);
	} catch (error) {
		console.error('Error updating memorized status:', error);
		res.status(500).json({ error: '覚えたステータスの更新に失敗しました' });
	}
});

export default router;
