/*
  Warnings:

  - You are about to drop the column `title` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `category` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."ExpenseType" AS ENUM ('ONE_TIME', 'RECURRING');

-- DropForeignKey
ALTER TABLE "public"."Expense" DROP CONSTRAINT "Expense_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Expense" DROP COLUMN "title",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3),
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "receiptUrl" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "type" "public"."ExpenseType" NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
