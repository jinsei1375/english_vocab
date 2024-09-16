import PageTitle from '@/components/PageTitle';
import Link from 'next/link';

export default function Home() {
	console.log('TOP: server side rendering');
	return (
		<>
			<PageTitle title="トップページ" />
			<Link href="/vocabulary" passHref>
				単語一覧ページへ
			</Link>
		</>
	);
}
