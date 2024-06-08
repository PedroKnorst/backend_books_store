/*
  Warnings:

  - You are about to drop the column `paymentId` on the `clients` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientId]` on the table `carts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `salespersons` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `salespersons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_clientId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_salespersonId_fkey";

-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "clientId" TEXT NOT NULL,
ALTER COLUMN "totalPrice" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "paymentId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" ADD COLUMN     "clientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "salespersons" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "balance" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "carts_clientId_key" ON "carts"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "clients_userId_key" ON "clients"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "salespersons_userId_key" ON "salespersons"("userId");

-- AddForeignKey
ALTER TABLE "salespersons" ADD CONSTRAINT "salespersons_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
