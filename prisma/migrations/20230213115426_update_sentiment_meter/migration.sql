/*
  Warnings:

  - You are about to drop the `Sentimeter` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Sentiment" AS ENUM ('HAPPY', 'GOOD', 'OK', 'BAD');

-- DropTable
DROP TABLE "Sentimeter";

-- DropEnum
DROP TYPE "Feel";

-- CreateTable
CREATE TABLE "SentimentMeter" (
    "sentimentMeterId" SERIAL NOT NULL,
    "author" INTEGER NOT NULL,
    "sentiment" "Sentiment" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SentimentMeter_pkey" PRIMARY KEY ("sentimentMeterId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SentimentMeter_sentimentMeterId_key" ON "SentimentMeter"("sentimentMeterId");
