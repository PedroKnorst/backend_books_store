/*
  Warnings:

  - Added the required column `category` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookCategory" AS ENUM ('HORROR', 'ROMANCE', 'SCIENCEFICTION', 'REMAKE', 'CRIME', 'INFANTIL', 'FILOSOFIC', 'HISTORIC', 'ACTION', 'OTHER');

-- AlterTable
ALTER TABLE "books" ADD COLUMN     "category" "BookCategory" NOT NULL,
ALTER COLUMN "publishDate" DROP NOT NULL;
