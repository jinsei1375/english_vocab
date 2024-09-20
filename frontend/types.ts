export interface Word {
	id?: number;
	userId?: number;
	word: string;
	meaning: string;
	partOfSpeechId: string;
	pronunciation: string;
	exampleSentence: string;
	synonyms: string;
	antonyms: string;
	url: string;
	memorized: boolean;
}

export interface PartOfSpeech {
	id: number;
	name: string;
}
