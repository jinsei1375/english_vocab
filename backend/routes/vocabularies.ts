import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// 単語追加
router.post('', async (req, res) => {
	const { userId, ...newWord } = req.body;
	try {
		const addedWord = await prisma.vocabulary.create({
			data: {
				...newWord,
				userId: userId as number,
			},
		});
		res.status(200).json(addedWord);
	} catch (error) {
		console.error('Error during word creation:', error);
		res.status(500).json({ error: '単語の登録に失敗しました。' });
	}
});

// 編集
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { userId, ...updateWord } = req.body;
	try {
		console.log('req.body:', req.body);
		const updatedWord = await prisma.vocabulary.update({
			where: { id: parseInt(id, 10) },
			data: {
				...updateWord,
				userId: userId as number,
			},
		});
		res.status(200).json(updatedWord);
	} catch (error) {
		console.error('Error during word update:', error);
		res.status(500).json({ error: '単語の更新に失敗しました。' });
	}
});

// 全単語取得
router.get('', async (req, res) => {
	try {
		const vocabularies = await prisma.vocabulary.findMany({ where: { deletedAt: null } });
		res.status(200).json(vocabularies);
	} catch (error) {
		console.error('Error fetching parts of speech:', error);
		res.status(500).json({ error: '取得に失敗しました。' });
	}
});

// 単語削除
router.delete('/:wordId', async (req, res) => {
	try {
		const wordId = parseInt(req.params.wordId, 10);
		const deletedWord = await prisma.vocabulary.update({
			where: { id: wordId },
			data: {
				deletedAt: new Date(),
			},
		});
		res.status(200).json(deletedWord);
	} catch (error) {
		console.error('Error fetching user vocabularies:', error);
		res.status(500).json({ error: '削除に失敗しました' });
	}
});

// 覚えたステータス更新
router.post('/:id/memorized', async (req, res) => {
	const id = parseInt(req.params.id, 10);
	const { memorized } = req.body;
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

// お気に入りステータス更新
router.post('/:id/favorite', async (req, res) => {
	const id = parseInt(req.params.id, 10);
	const { favorite } = req.body;
	try {
		const updatedWord = await prisma.vocabulary.update({
			where: { id: id as number },
			data: { favorite: favorite as boolean },
		});
		res.status(200).json(updatedWord);
	} catch (error) {
		console.error('Error updating favorite status:', error);
		res.status(500).json({ error: 'お気に入りステータスの更新に失敗しました' });
	}
});

export default router;
