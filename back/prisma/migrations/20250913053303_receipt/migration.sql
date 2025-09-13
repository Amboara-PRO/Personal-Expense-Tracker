/*
  Warnings:

  - You are about to drop the column `receiptUrl` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the `DashboardStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."DashboardStats" DROP CONSTRAINT "DashboardStats_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "receiptUrl";

-- DropTable
DROP TABLE "public"."DashboardStats";

-- CreateTable
CREATE TABLE "public"."Receipt" (
    "id" SERIAL NOT NULL,
    "filePath" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expenseId" INTEGER NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Receipt_expenseId_key" ON "public"."Receipt"("expenseId");

-- AddForeignKey
ALTER TABLE "public"."Receipt" ADD CONSTRAINT "Receipt_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "public"."Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;
