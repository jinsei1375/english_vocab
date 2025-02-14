import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	Button,
	Box,
	IconButton,
} from '@mui/material';
import { WordType } from '@/types';
import CheckIcon from '@mui/icons-material/Check';
import './WordModal.css';
import partOfSpeechIdToName from '@/utils/partOfSpeech';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { formatDate } from '@/utils/formatDate';
import { handleMemorizedClick } from '@/utils/vocabulary';

interface WordModalProps {
	open: boolean;
	onClose: () => void;
	word: WordType | null;
	setSelectedWord: React.Dispatch<React.SetStateAction<WordType | null>>;
	// handleMemorizedClick: (word: WordType) => void;
	handleEditClick: () => void;
	showDetails: boolean;
	setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
	setOpenDelteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
	vocabularies: WordType[];
	setVocabularies: React.Dispatch<React.SetStateAction<WordType[]>>;
	setFlashMessage: React.Dispatch<React.SetStateAction<string | null>>;
	isTestMode?: boolean;
	handleTestAnswer?: (isCorrect: boolean) => void;
	userSettings: Record<string, boolean>;
}

const WordModal: React.FC<WordModalProps> = ({
	open,
	onClose,
	word,
	setSelectedWord,
	// handleMemorizedClick,
	handleEditClick,
	showDetails,
	setShowDetails,
	setOpenDelteConfirm,
	vocabularies,
	setVocabularies,
	setFlashMessage,
	isTestMode,
	handleTestAnswer,
	userSettings,
}) => {
	const handleClose = () => {
		setShowDetails(false);
		setSelectedWord(null);
		onClose();
	};

	if (!word) return null;
	const initialSlideIndex = vocabularies.findIndex((v) => v.id === word.id);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			PaperProps={{
				sx: {
					maxWidth: '400px', // モーダルの最小幅を設定
					minHeight: '300px', // モーダルの最小高さを設定
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					backgroundColor: 'transparent',
					margin: '0px',
					boxShadow: 'none',
				},
			}}
		>
			<Box display="flex" alignItems="center">
				{!isTestMode && <IconButton className="swiper-button-prev"></IconButton>}
				<Swiper
					initialSlide={initialSlideIndex}
					onSlideChange={(swiper) => setSelectedWord(vocabularies[swiper.activeIndex])}
					modules={[Navigation]}
					navigation={{
						prevEl: '.swiper-button-prev',
						nextEl: '.swiper-button-next',
					}}
					allowTouchMove={isTestMode ? false : true}
					style={{ width: '100%' }}
				>
					{vocabularies.map((vocabulary) => (
						<SwiperSlide key={vocabulary.id}>
							<DialogContent sx={{ position: 'relative', minHeight: '300px', padding: '40px 24px' }}>
								<Box className={`flip-card ${showDetails ? 'flipped' : ''}`} sx={{ minHeight: '300px' }}>
									<Box className="flip-card-inner" sx={{ minHeight: '300px' }}>
										{/* カード前面 */}
										<Box className="flip-card-front">
											<DialogTitle sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
												<Box display="flex" justifyContent="center" alignItems="center">
													{!isTestMode && word.memorized && (
														<Box sx={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
															<CheckIcon sx={{ color: 'green' }} />
														</Box>
													)}
													<Box sx={{ wordBreak: 'break-word', textAlign: 'center' }}>{word.word}</Box>
												</Box>
											</DialogTitle>
											<Box display="flex" justifyContent="center">
												{!isTestMode && <Button onClick={handleClose}>閉じる</Button>}
												<Button onClick={() => setShowDetails(true)}>訳をみる</Button>
											</Box>
										</Box>
										{/* カード裏面 */}
										<Box className="flip-card-back">
											<DialogTitle sx={{ textAlign: 'center', wordBreak: 'break-word' }}>
												<Box display="flex" justifyContent="center" alignItems="center">
													{word.memorized && (
														<Box sx={{ width: '24px', display: 'flex', justifyContent: 'center' }}>
															<CheckIcon sx={{ color: 'green' }} />
														</Box>
													)}
													<Box sx={{ wordBreak: 'break-word', textAlign: 'center' }}>{word.word}</Box>
												</Box>
											</DialogTitle>
											<Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-word' }}>
												意味: {word.meaning}
											</Typography>
											{userSettings.partOfSpeech && (
												<Typography variant="body2" color="text.secondary">
													品詞: {partOfSpeechIdToName(word.partOfSpeechId)}
												</Typography>
											)}
											{userSettings.pronunciation && (
												<Typography variant="body2" color="text.secondary">
													発音記号: {word.pronunciation}
												</Typography>
											)}
											{userSettings.exampleSentence && (
												<Typography variant="body2" color="text.secondary">
													例文: {word.exampleSentence}
												</Typography>
											)}
											{userSettings.synonyms && (
												<Typography variant="body2" color="text.secondary">
													類義語: {word.synonyms}
												</Typography>
											)}
											{userSettings.antonyms && (
												<Typography variant="body2" color="text.secondary">
													対義語: {word.antonyms}
												</Typography>
											)}
											{userSettings.url && (
												<Typography variant="body2" color="text.secondary">
													URL:{' '}
													{word.url && (
														<a target="_blank" rel="noopener noreferrer" href={word.url}>
															{word.url}
														</a>
													)}
												</Typography>
											)}
											{isTestMode ? (
												<Box>
													<Button variant="contained" color="success" onClick={() => handleTestAnswer?.(true)}>
														◯
													</Button>
													<Button variant="contained" color="error" onClick={() => handleTestAnswer?.(false)}>
														✖️
													</Button>
												</Box>
											) : (
												<Box>
													<Typography variant="body2" color="text.secondary">
														最終更新日: {formatDate(word.updatedAt, true)}
													</Typography>
													<Typography variant="body2" color="text.secondary">
														登録日: {formatDate(word.createdAt, true)}
													</Typography>
													<Box display="flex" justifyContent="center" mb={1}>
														<Button color="error" onClick={() => setOpenDelteConfirm(true)}>
															削除する
														</Button>
														<Button
															color="primary"
															onClick={() =>
																handleMemorizedClick(
																	word,
																	vocabularies,
																	setVocabularies,
																	setSelectedWord,
																	setFlashMessage
																)
															}
														>
															{word.memorized ? 'チェック外す' : '覚えた'}
														</Button>
														<Button color="primary" onClick={handleEditClick}>
															編集する
														</Button>
													</Box>
													<Box display="flex" justifyContent="center">
														<Button onClick={handleClose}>閉じる</Button>
														<Button onClick={() => setShowDetails(false)}>戻る</Button>
													</Box>
												</Box>
											)}
										</Box>
									</Box>
								</Box>
							</DialogContent>
						</SwiperSlide>
					))}
				</Swiper>
				{!isTestMode && <IconButton className="swiper-button-next"></IconButton>}
			</Box>
		</Dialog>
	);
};

export default WordModal;
