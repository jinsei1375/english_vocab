import express from 'express';
import { prisma } from '../lib/prisma';
import cors from 'cors';

const app = express();
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
    const user = await prisma.users.upsert({
      where: { email },
      update: { google_id, name },
      create: { google_id, name, email },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'ユーザーの作成に失敗しました。' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
