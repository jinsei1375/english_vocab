import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.post('', async (req, res) => {
	const { google_id, name, email } = req.body;

	try {
		let user = await prisma.user.findUnique({
			where: { googleId: google_id },
		});

		if (!user) {
			user = await prisma.user.create({
				data: {
					googleId: google_id,
					name,
					email,
				},
			});
		}

		res.status(200).json(user);
	} catch (error) {
		console.error('Error during user creation:', error);
		res.status(500).json({ error: 'ユーザーの作成に失敗しました。' });
	}
});

// ユーザー情報取得
router.get('', async (req, res) => {
	const { email } = req.query;

	try {
		const user = await prisma.user.findUnique({
			where: { email: email as string },
		});

		if (!user) {
			return res.status(404).json({ error: 'ユーザーが見つかりません。' });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error('Error fetching user:', error);
		res.status(500).json({ error: 'ユーザー情報の取得に失敗しました。' });
	}
});

// ユーザーの単語取得
router.get('/:userId/vocabularies', async (req, res) => {
	try {
		const userId = parseInt(req.params.userId, 10);
		const vocabularies = await prisma.vocabulary.findMany({
			where: { userId: userId as number, deletedAt: null },
			orderBy: { createdAt: 'desc' },
		});
		res.status(200).json(vocabularies);
	} catch (error) {
		console.error('Error fetching user vocabularies:', error);
		res.status(500).json({ error: '単語取得に失敗しました' });
	}
});

// ユーザーのテスト用単語取得→ランダム10問取得するようにする
router.get('/:userId/vocabularies/test/', async (req, res) => {
	try {
		const userId = parseInt(req.params.userId, 10);
		const vocabularies = await prisma.vocabulary.findMany({
			where: { userId: userId as number, deletedAt: null },
			orderBy: { createdAt: 'desc' },
		});

		// ランダム10単語を選択
		const shuffled = vocabularies.sort(() => 0.5 - Math.random());
		const randomVocabularies = shuffled.slice(0, 10);

		res.status(200).json(randomVocabularies);
	} catch (error) {
		console.error('Error fetching user vocabularies:', error);
		res.status(500).json({ error: '単語取得に失敗しました' });
	}
});

// ユーザーの記録取得
router.get('/:userId/report', async (req, res) => {
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

// ユーザーのテスト履歴取得
router.get('/:userId/testHistory', async (req, res) => {
	const userId = parseInt(req.params.userId, 10);
	try {
		const testHistories = await prisma.testHistory.findMany({
			where: { userId },
			orderBy: { testDate: 'desc' },
		});

		res.status(200).json(testHistories);
	} catch (error) {
		console.error('Error during test history fetching:', error);
		res.status(500).json({ error: 'テスト履歴の取得に失敗しました。' });
	}
});

// テスト結果の保存
router.post('/:userId/testResults', async (req, res) => {
	const userId = parseInt(req.params.userId, 10);
	const { results } = req.body;

	try {
		const testHistory = await prisma.testHistory.create({
			data: {
				userId,
				testDate: new Date(),
			},
		});

		const testResults = await prisma.testResult.createMany({
			data: results.map((result: { wordId: number; isCorrect: boolean }) => ({
				userId,
				vocabularyId: result.wordId,
				isCorrect: result.isCorrect,
				testHistoryId: testHistory.id,
			})),
		});

		res.status(200).json(testResults);
	} catch (error) {
		console.error('Error during test results saving:', error);
		res.status(500).json({ error: 'テスト結果の保存に失敗しました。' });
	}
});

export default router;
