/*
  Warnings:

  - You are about to drop the column `author` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `character` on the `books` table. All the data in the column will be lost.
  - Made the column `cartId` on table `book_carts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "book_carts" DROP CONSTRAINT "book_carts_cartId_fkey";

-- AlterTable
ALTER TABLE "book_carts" ALTER COLUMN "cartId" SET NOT NULL;

-- AlterTable
ALTER TABLE "books" DROP COLUMN "author",
DROP COLUMN "character",
ADD COLUMN     "authors" TEXT[],
ADD COLUMN     "characters" TEXT[],
ALTER COLUMN "storage" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "book_carts" ADD CONSTRAINT "book_carts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
