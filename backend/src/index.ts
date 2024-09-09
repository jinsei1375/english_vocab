import express from 'express';
import { prisma } from '../lib/prisma';
import cors from 'cors';

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

app.post('/api/users', async (req, res) => {
  console.log('Request from frontend:', req.body);
  const { google_id, name, email } = req.body;

  try {
    console.log('Connecting to database...');
    // console.log(prisma.user);
    let user = await prisma.user.findUnique({
      where: { googleId: google_id },
    });

    console.log('User found:', user);

    if (!user) {
      // ユーザーが存在しない場合、新しいユーザーを作成
      console.log('Creating new user...');
      user = await prisma.user.create({
        data: {
          googleId: google_id,
          name,
          email,
        },
      });
      console.log('New user created:', user);
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error during user creation:', error);
    res.status(500).json({ error: 'ユーザーの作成に失敗しました。' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
