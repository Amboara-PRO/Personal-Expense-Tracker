-- CreateTable
CREATE TABLE "public"."DashboardStats" (
    "id" SERIAL NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "recurringExpensesCount" INTEGER NOT NULL DEFAULT 0,
    "oneTimeExpensesCount" INTEGER NOT NULL DEFAULT 0,
    "mostUsedCategory" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DashboardStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DashboardStats_userId_key" ON "public"."DashboardStats"("userId");

-- AddForeignKey
ALTER TABLE "public"."DashboardStats" ADD CONSTRAINT "DashboardStats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
