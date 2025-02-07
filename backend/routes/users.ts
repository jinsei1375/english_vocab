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
		//クエリパラエータのonlyUnmemorizedの値を取得
		const onlyUnmemorized = req.query.onlyUnmemorized === 'true';
		const whereCondition: any = {
			userId,
			deletedAt: null,
		};
		console.log('onlyUnmemorized:', onlyUnmemorized);
		if (onlyUnmemorized) {
			whereCondition.memorized = false;
		}
		const vocabularies = await prisma.vocabulary.findMany({
			where: whereCondition,
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

		// テスト実施回数取得
		const testHistoryCount = await prisma.testHistory.count({
			where: { userId },
		});

		res.status(200).json({
			registrationDate: user.createdAt,
			registeredWords: totalWords,
			learnedWords: memorizedWords,
			notLearnedWords: unmemorizedWords,
			testHistoryCount,
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
			include: {
				testResults: {
					include: {
						vocabulary: true,
					},
				},
			},
			orderBy: { testDate: 'desc' },
		});

		res.status(200).json(testHistories);
	} catch (error) {
		console.error('Error during test history fetching:', error);
		res.status(500).json({ error: 'テスト履歴の取得に失敗しました。' });
	}
});

// ユーザーのテスト履歴取得
router.get('/:userId/testHistory/:testHistoryId', async (req, res) => {
	const testHistoryId = parseInt(req.params.testHistoryId, 10);
	try {
		const testHistory = await prisma.testHistory.findUnique({
			where: { id: testHistoryId },
			include: {
				testResults: {
					include: {
						vocabulary: true,
					},
				},
			},
		});

		if (!testHistory) {
			return res.status(404).json({ error: 'Test history not found' });
		}

		res.status(200).json(testHistory);
	} catch (error) {
		console.error('Error during test history fetching:', error);
		res.status(500).json({ error: 'テスト履歴詳細の取得に失敗しました。' });
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

// 表示設定の取得
router.get('/:userId/settings/display', async (req, res) => {
	const userId = parseInt(req.params.userId, 10);
	try {
		const userSettings = await prisma.userSetting.findMany({
			where: {
				userId,
				deletedAt: null,
			},
		});
		if (!userSettings) {
			console.error('User settings not found');
			return res.status(404).json({ error: 'User settings not found' });
		}

		const formattedSettings = userSettings.reduce((acc, setting) => {
			acc[setting.settingKey] = setting.settingValue === 'true';
			return acc;
		}, {} as Record<string, boolean>);

		res.status(200).json(formattedSettings);
	} catch (error) {
		console.error('Error during user settings fetching:', error);
		res.status(500).json({ error: 'ユーザー設定の取得に失敗しました。' });
	}
});

// 表示設定の保存
router.put('/:userId/settings/display', async (req, res) => {
	const userId = parseInt(req.params.userId, 10);
	const settings: Record<string, boolean> = req.body;
	try {
		const userSettings = await Promise.all(
			Object.keys(settings).map(async (key) => {
				return prisma.userSetting.upsert({
					where: {
						userId_settingKey: {
							userId,
							settingKey: key,
						},
					},
					update: {
						settingValue: String(settings[key]),
						deletedAt: null as any,
					},
					create: {
						userId,
						settingKey: key,
						settingValue: String(settings[key]),
					},
				});
			})
		);

		const formattedSettings = userSettings.reduce((acc, setting) => {
			acc[setting.settingKey] = setting.settingValue === 'true';
			return acc;
		}, {} as Record<string, boolean>);
		res.status(200).json(formattedSettings);
	} catch (error) {
		console.error('Error during user settings saving:', error);
		res.status(500).json({ error: 'ユーザー設定の保存に失敗しました。' });
	}
});

export default router;
