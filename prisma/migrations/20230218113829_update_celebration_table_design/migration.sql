/*
  Warnings:

  - The primary key for the `Celebration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `celebrationId` on the `Celebration` table. All the data in the column will be lost.
  - The primary key for the `SentimentMeter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `sentimentMeterId` on the `SentimentMeter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Celebration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `SentimentMeter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `Celebration` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CelebrationType" AS ENUM ('CELEBRATION', 'IMPEDIMENT');

-- DropIndex
DROP INDEX "Celebration_celebrationId_key";

-- DropIndex
DROP INDEX "SentimentMeter_sentimentMeterId_key";

-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "author" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Celebration" DROP CONSTRAINT "Celebration_pkey",
DROP COLUMN "celebrationId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "type" "CelebrationType" NOT NULL,
ALTER COLUMN "author" SET DATA TYPE TEXT,
ADD CONSTRAINT "Celebration_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "author" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "RequestTaggedUser" ALTER COLUMN "userId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "SentimentMeter" DROP CONSTRAINT "SentimentMeter_pkey",
DROP COLUMN "sentimentMeterId",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "author" SET DATA TYPE TEXT,
ADD CONSTRAINT "SentimentMeter_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "CelebrationReactedUser" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "celebrationId" INTEGER NOT NULL,

    CONSTRAINT "CelebrationReactedUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CelebrationReactedUser_id_key" ON "CelebrationReactedUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Celebration_id_key" ON "Celebration"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SentimentMeter_id_key" ON "SentimentMeter"("id");

-- AddForeignKey
ALTER TABLE "CelebrationReactedUser" ADD CONSTRAINT "CelebrationReactedUser_celebrationId_fkey" FOREIGN KEY ("celebrationId") REFERENCES "Celebration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
