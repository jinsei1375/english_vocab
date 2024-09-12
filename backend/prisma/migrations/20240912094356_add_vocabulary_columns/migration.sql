-- AlterTable
ALTER TABLE "vocabularies" ADD COLUMN     "antonyms" TEXT,
ADD COLUMN     "example_sentence" TEXT,
ADD COLUMN     "memorized" BOOLEAN,
ADD COLUMN     "part_of_speech" TEXT,
ADD COLUMN     "pronunciation" TEXT,
ADD COLUMN     "synonyms" TEXT,
ADD COLUMN     "url" TEXT;
