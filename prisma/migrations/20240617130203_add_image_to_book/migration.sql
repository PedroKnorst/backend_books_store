-- AlterTable
ALTER TABLE "books" ADD COLUMN     "imageId" TEXT;

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_bookId_key" ON "images"("bookId");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
