-- CreateEnum
CREATE TYPE "Feel" AS ENUM ('HAPPY', 'GOOD', 'OK', 'BAD');

-- AlterTable
ALTER TABLE "PONote" ADD CONSTRAINT "PONote_pkey" PRIMARY KEY ("noteId");

-- CreateTable
CREATE TABLE "Sentimeter" (
    "sentimeterId" SERIAL NOT NULL,
    "author" INTEGER NOT NULL,
    "feel" "Feel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sentimeter_pkey" PRIMARY KEY ("sentimeterId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sentimeter_sentimeterId_key" ON "Sentimeter"("sentimeterId");
