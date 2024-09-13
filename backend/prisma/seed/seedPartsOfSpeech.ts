import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const partsOfSpeech = [
		{ name: '名詞' },
		{ name: '動詞' },
		{ name: '形容詞' },
		{ name: '副詞' },
		{ name: '代名詞' },
		{ name: '前置詞' },
		{ name: '接続詞' },
		{ name: 'フレーズ' },
	];

	for (const part of partsOfSpeech) {
		await prisma.partOfSpeech.upsert({
			where: { name: part.name },
			update: {},
			create: part,
		});
	}

	console.log('品詞データの挿入が完了しました。');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
