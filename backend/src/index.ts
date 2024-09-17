import express from 'express';
import cors from 'cors';
import userRoutes from '../routes/users';
import vocabularyRoutes from '../routes/vocabularies';

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
app.use('/api', vocabularyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
