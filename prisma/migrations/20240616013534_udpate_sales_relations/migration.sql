/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Made the column `salespersonId` on table `books` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cartId` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_salespersonId_fkey";

-- DropForeignKey
ALTER TABLE "carts" DROP CONSTRAINT "carts_clientId_fkey";

-- DropIndex
DROP INDEX "carts_clientId_key";

-- AlterTable
ALTER TABLE "books" ALTER COLUMN "salespersonId" SET NOT NULL;

-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "clientId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "paymentId" TEXT,
ALTER COLUMN "cartId" SET NOT NULL;

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "type" SET DEFAULT 'CREDITCARD';

-- CreateIndex
CREATE UNIQUE INDEX "clients_cartId_key" ON "clients"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_clientId_key" ON "payments"("clientId");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_salespersonId_fkey" FOREIGN KEY ("salespersonId") REFERENCES "salespersons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
