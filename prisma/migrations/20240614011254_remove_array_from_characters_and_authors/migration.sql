/*
  Warnings:

  - You are about to drop the column `authors` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `characters` on the `books` table. All the data in the column will be lost.
  - Added the required column `author` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `character` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "authors",
DROP COLUMN "characters",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "character" TEXT NOT NULL;
