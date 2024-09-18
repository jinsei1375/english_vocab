export interface Word {
  id: number;
  userId?: number;
  word: string;
  meaning: string;
  partOfSpeech: string;
  pronunciation: string;
  exampleSentence: string;
  synonyms: string;
  antonyms: string;
  url: string;
  memorized: boolean;
}
