import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.post('/word/add', async (req, res) => {
	const { word, meaning, userId } = req.body;

	try {
		const newWord = await prisma.vocabulary.create({
			data: {
				word,
				meaning,
				user_id: userId,
			},
		});
		res.status(200).json(newWord);
	} catch (error) {
		console.error('Error during word creation:', error);
		res.status(500).json({ error: '単語の登録に失敗しました。' });
	}
});

export default router;
