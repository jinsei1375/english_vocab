import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.get('/reports/:userId', async (req, res) => {
	const userId = parseInt(req.params.userId, 10);
	try {
		// ユーザー情報の取得
		const user = await prisma.user.findUnique({
			where: { id: userId },
		});
		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// 単語情報の取得
		const vocabularies = await prisma.vocabulary.findMany({
			where: { userId: userId },
		});
		const totalWords = vocabularies.length;
		const memorizedWords = vocabularies.filter((v) => v.memorized).length;
		const unmemorizedWords = totalWords - memorizedWords;

		res.status(200).json({
			registrationDate: user.createdAt,
			registeredWords: totalWords,
			learnedWords: memorizedWords,
			notLearnedWords: unmemorizedWords,
		});
	} catch (error) {
		console.error('Error during report fetching:', error);
		res.status(500).json({ error: 'レポートの取得に失敗しました。' });
	}
});

export default router;
