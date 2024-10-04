import { DateTime } from 'next-auth/providers/kakao';

export interface WordType {
	id?: number;
	userId?: number;
	word: string;
	meaning: string;
	partOfSpeechId: number | null;
	pronunciation: string;
	exampleSentence: string;
	synonyms: string;
	antonyms: string;
	url: string;
	memorized: boolean;
	createdAt: DateTime;
	updatedAt: DateTime;
}

export interface PartOfSpeech {
	id: number;
	name: string;
}
