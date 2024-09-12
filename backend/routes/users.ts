import { Router } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

router.post('/users', async (req, res) => {
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

// ユーザー情報を取得するエンドポイント
router.get('/users/me', async (req, res) => {
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

export default router;
