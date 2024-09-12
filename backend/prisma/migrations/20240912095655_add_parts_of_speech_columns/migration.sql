/*
  Warnings:

  - Added the required column `updated_at` to the `parts_of_speech` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "parts_of_speech" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
