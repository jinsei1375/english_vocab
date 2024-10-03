import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// 品詞取得
router.get('', async (req, res) => {
	try {
		const partsOfSpeech = await prisma.partOfSpeech.findMany();
		res.status(200).json(partsOfSpeech);
	} catch (error) {
		console.error('Error fetching parts of speech:', error);
		res.status(500).json({ error: '品詞カテゴリの取得に失敗しました。' });
	}
});

export default router;
