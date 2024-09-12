/*
  Warnings:

  - You are about to drop the column `part_of_speech` on the `vocabularies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vocabularies" DROP COLUMN "part_of_speech",
ADD COLUMN     "part_of_speech_id" INTEGER;

-- CreateTable
CREATE TABLE "parts_of_speech" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "parts_of_speech_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "parts_of_speech_name_key" ON "parts_of_speech"("name");

-- AddForeignKey
ALTER TABLE "vocabularies" ADD CONSTRAINT "vocabularies_part_of_speech_id_fkey" FOREIGN KEY ("part_of_speech_id") REFERENCES "parts_of_speech"("id") ON DELETE SET NULL ON UPDATE CASCADE;
