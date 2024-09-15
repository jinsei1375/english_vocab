import dynamic from 'next/dynamic';

const PageTitle = dynamic(() => import('@/components/PageTitle'), { ssr: false });

export default function Home() {
	console.log('server side rendering');
	return (
		<>
			<PageTitle title="トップページ" />
		</>
	);
}
