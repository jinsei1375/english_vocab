import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/users';
import wordRoutes from '../routes/words';

const app = express();
console.log('Prisma Client initialized');
app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:3000', // フロントエンドのオリジンを指定
		methods: ['GET', 'POST'], // 許可するHTTPメソッドを指定
		allowedHeaders: ['Content-Type', 'Authorization'], // 許可するヘッダーを指定
	})
);

app.use('/api', userRoutes);
app.use('/api', wordRoutes);

// // ユーザー登録
// app.post('/api/users', async (req, res) => {
// 	console.log('Request from frontend:', req.body);
// 	const { google_id, name, email } = req.body;

// 	try {
// 		console.log('Connecting to database...');
// 		// console.log(prisma.user);
// 		let user = await prisma.user.findUnique({
// 			where: { googleId: google_id },
// 		});

// 		console.log('User found:', user);

// 		if (!user) {
// 			// ユーザーが存在しない場合、新しいユーザーを作成
// 			console.log('Creating new user...');
// 			user = await prisma.user.create({
// 				data: {
// 					googleId: google_id,
// 					name,
// 					email,
// 				},
// 			});
// 			console.log('New user created:', user);
// 		}

// 		res.status(200).json(user);
// 	} catch (error) {
// 		console.error('Error during user creation:', error);
// 		res.status(500).json({ error: 'ユーザーの作成に失敗しました。' });
// 	}
// });

// // 単語登録
// app.post('/api/word/add', async (req, res) => {
// 	const { word, meaning, userId } = req.body;

// 	try {
// 		const newWord = await prisma.vocabulary.create({
// 			data: {
// 				word,
// 				meaning,
// 				user_id: userId,
// 			},
// 		});
// 		res.status(200).json(newWord);
// 	} catch (error) {
// 		console.error('Error during word creation:', error);
// 		res.status(500).json({ error: '単語の登録に失敗しました。' });
// 	}
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
