'use client';
import React, { useEffect, useState } from 'react';
import WordCardList from '@/components/WordCardList';
import PageTitle from '@/components/PageTitle';
import AddButton from '@/components/AddButton';
import { WordType } from '@/types';
import { Alert, Box, CircularProgress, Snackbar, Pagination, PaginationItem } from '@mui/material';
import { getUserId } from '@/utils/auth';
import WordModal from '@/components/WordModal/WordModal';
import WordFormDialog from '@/components/WordFormDialog';
import WordDeleteConfirmDialog from '@/components/WordDeleteConfirmDialog';
import SortSelect from '@/components/SortSelect';
import FileterSelect from '@/components/FilterSelect';
import SearchInput from '@/components/SearchInput';
import { showFlashMessage } from '@/utils/flashMessage';
import { handleCloseModal, handleEditClick, handleWordClick } from '@/utils/modal';
import { addOrEditVocabulary } from '@/utils/vocabulary';
import PerPageSelect from '@/components/PerPageSelect';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Vocabulary() {
	const [openForm, setOpenForm] = useState(false);
	const [vocabularies, setVocabularies] = useState<WordType[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedWord, setSelectedWord] = useState<WordType | null>(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [flashMessage, setFlashMessage] = useState<string | null>(null);
	const [showDetails, setShowDetails] = useState(false);
	const [openDeleteConfirm, setOpenDelteConfirm] = useState(false);
	const [sortOption, setSortOption] = useState('createdAt');
	const [filterOption, setFilterOption] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	// クライアントサイドでデータをフェッチ
	useEffect(() => {
		const fetchVocabularies = async () => {
			try {
				const userId = await getUserId();

				// 単語一覧を取得
				const vocabulariesResponse = await fetch(`${apiUrl}/api/users/${userId}/vocabularies/`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});
				if (!vocabulariesResponse.ok) {
					throw new Error('Failed to fetch vocabularies');
				}

				let vocabularies: WordType[] = await vocabulariesResponse.json();
				// 絞り込み
				vocabularies = filterVocabularies(vocabularies, filterOption);
				// 並び替え
				vocabularies = sortVocabularies(vocabularies, sortOption);
				// 検索
				vocabularies = searchVocabularies(vocabularies, searchQuery);

				setVocabularies(vocabularies);
				setTotalPages(Math.ceil(vocabularies.length / itemsPerPage));
			} catch {
				throw new Error('Failed to fetch vocabularies');
			} finally {
				setLoading(false);
			}
		};
		fetchVocabularies();
	}, [sortOption, filterOption, searchQuery, itemsPerPage]);

	// ページ変更時の処理
	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	// 現在のページに表示する単語を取得
	const currentVocabularies = vocabularies.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// 並び替え処理
	const sortVocabularies = (vocabularies: WordType[], option: string) => {
		switch (option) {
			case 'updatedAt':
				return vocabularies.sort(
					(a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
				);
			case 'alphabetical':
				return vocabularies.sort((a, b) => a.word.localeCompare(b.word));
			case 'createdAt':
			default:
				return vocabularies;
		}
	};

	// 絞り込み処理
	const filterVocabularies = (vocabularies: WordType[], option: string) => {
		switch (option) {
			case 'memorized':
				return vocabularies.filter((vocabulary) => vocabulary.memorized);
			case 'notMemorized':
				return vocabularies.filter((vocabulary) => !vocabulary.memorized);
			case 'all':
			default:
				return vocabularies;
		}
	};

	// 検索処理
	const searchVocabularies = (vocabularies: WordType[], query: string) => {
		if (!query) return vocabularies;
		return vocabularies.filter((word) => word.word.toLowerCase().includes(query.toLowerCase()));
	};

	// 新しい単語を追加or編集時の処理
	const handleAddOrEditWord = async (newWord: WordType) => {
		addOrEditVocabulary(newWord, vocabularies, setVocabularies, setFlashMessage);
		handleCloseModal(setOpenForm, setModalOpen, setSelectedWord, setShowDetails, setOpenDelteConfirm);
	};

	// 検索アイコンクリック
	const handleSearchIconClick = () => {
		setIsSearchOpen((prev) => !prev);
		if (isSearchOpen) {
			setSearchQuery('');
		}
	};

	// 単語削除
	const handleDeleteWord = async (wordId: number | undefined) => {
		try {
			const response = await fetch(`${apiUrl}/api/vocabularies/${wordId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (!response.ok) {
				throw new Error('Failed to update memorized status');
			}
			const deleteddWord = await response.json();

			// 削除された単語一覧から削除
			setVocabularies((prevVocabularies) =>
				prevVocabularies.filter((vocabulary) => vocabulary.id !== deleteddWord.id)
			);

			// フラッシュメッセージを表示
			showFlashMessage('単語が削除されました', setFlashMessage);
			handleCloseModal(
				setOpenForm,
				setModalOpen,
				setSelectedWord,
				setShowDetails,
				setOpenDelteConfirm
			);
		} catch {
			throw new Error('Failed to update memorized status');
		}
	};

	return (
		<>
			<PageTitle title="単語一覧" />
			{/* 単語追加, 並び替え */}
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: 2,
					alignItems: 'flex-end',
					flexDirection: { xs: 'column', lg: 'row' },
					gap: { xs: 2, lg: 0 },
				}}
			>
				<AddButton onClick={() => setOpenForm(true)} label="単語追加" />
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						flexDirection: { xs: 'column', md: 'row' },
						alignItems: { xs: 'flex-end', md: 'flex-start' },
					}}
				>
					<SearchInput
						isSearchOpen={isSearchOpen}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
						handleSearchIconClick={handleSearchIconClick}
					/>
					<Box sx={{ display: 'flex', gap: 2 }}>
						<PerPageSelect
							filterOption={itemsPerPage}
							setFilterOption={setItemsPerPage}
							setCurrentPage={setCurrentPage}
						/>
						<FileterSelect filterOption={filterOption} setFilterOption={setFilterOption} />
						<SortSelect sortOption={sortOption} setSortOption={setSortOption} />
					</Box>
				</Box>
			</Box>
			{/* 単語一覧 */}
			{loading ? (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '50px',
						height: '100vh',
					}}
				>
					<CircularProgress />
				</Box>
			) : (
				<Box>
					<WordCardList
						words={currentVocabularies}
						handleClick={handleWordClick}
						setSelectedWord={setSelectedWord}
						setModalOpen={setModalOpen}
					/>
					<Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
						<Pagination
							count={totalPages}
							page={currentPage}
							onChange={handlePageChange}
							color="primary"
							renderItem={(item) => (
								<PaginationItem
									{...item}
									sx={{
										backgroundColor: item.page === currentPage ? 'primary.main' : 'white',
										color: item.page === currentPage ? 'white' : 'black',
										'&:hover': {
											opacity: 0.7,
											backgroundColor: item.page === currentPage ? 'primary.main' : 'white',
										},
										'&.MuiPaginationItem-ellipsis': {
											color: 'white', // 省略の点線の色を白に変更
											backgroundColor: 'white',
										},
									}}
								/>
							)}
						/>
					</Box>
				</Box>
			)}
			<WordFormDialog
				open={openForm}
				onClose={() =>
					handleCloseModal(
						setOpenForm,
						setModalOpen,
						setSelectedWord,
						setShowDetails,
						setOpenDelteConfirm
					)
				}
				onAddWord={handleAddOrEditWord}
				initialWord={selectedWord}
			/>
			<WordModal
				open={modalOpen}
				onClose={() =>
					handleCloseModal(
						setOpenForm,
						setModalOpen,
						setSelectedWord,
						setShowDetails,
						setOpenDelteConfirm
					)
				}
				word={selectedWord}
				setSelectedWord={setSelectedWord}
				handleEditClick={() => handleEditClick(setOpenForm)}
				showDetails={showDetails}
				setShowDetails={setShowDetails}
				setOpenDelteConfirm={setOpenDelteConfirm}
				vocabularies={vocabularies}
				setVocabularies={setVocabularies}
				setFlashMessage={setFlashMessage}
			/>
			<WordDeleteConfirmDialog
				open={openDeleteConfirm}
				setOpenDelteConfirm={setOpenDelteConfirm}
				onDelete={handleDeleteWord}
				selectedWord={selectedWord}
			/>
			<Snackbar open={!!flashMessage} autoHideDuration={3000} onClose={() => setFlashMessage(null)}>
				<Alert onClose={() => setFlashMessage(null)} severity="success" sx={{ width: '100%' }}>
					{flashMessage}
				</Alert>
			</Snackbar>
		</>
	);
}
