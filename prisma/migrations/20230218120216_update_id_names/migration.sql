/*
  Warnings:

  - The primary key for the `Celebration` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Celebration` table. All the data in the column will be lost.
  - The primary key for the `CelebrationReactedUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `CelebrationReactedUser` table. All the data in the column will be lost.
  - The primary key for the `Request` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Request` table. All the data in the column will be lost.
  - The primary key for the `RequestTaggedUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RequestTaggedUser` table. All the data in the column will be lost.
  - The primary key for the `SentimentMeter` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `SentimentMeter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[celebrationId]` on the table `Celebration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reactionId]` on the table `CelebrationReactedUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[requestId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tagId]` on the table `RequestTaggedUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sentimentId]` on the table `SentimentMeter` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CelebrationReactedUser" DROP CONSTRAINT "CelebrationReactedUser_celebrationId_fkey";

-- DropForeignKey
ALTER TABLE "RequestTaggedUser" DROP CONSTRAINT "RequestTaggedUser_requestId_fkey";

-- DropIndex
DROP INDEX "Celebration_id_key";

-- DropIndex
DROP INDEX "CelebrationReactedUser_id_key";

-- DropIndex
DROP INDEX "Request_id_key";

-- DropIndex
DROP INDEX "RequestTaggedUser_id_key";

-- DropIndex
DROP INDEX "SentimentMeter_id_key";

-- AlterTable
ALTER TABLE "Celebration" DROP CONSTRAINT "Celebration_pkey",
DROP COLUMN "id",
ADD COLUMN     "celebrationId" SERIAL NOT NULL,
ADD CONSTRAINT "Celebration_pkey" PRIMARY KEY ("celebrationId");

-- AlterTable
ALTER TABLE "CelebrationReactedUser" DROP CONSTRAINT "CelebrationReactedUser_pkey",
DROP COLUMN "id",
ADD COLUMN     "reactionId" SERIAL NOT NULL,
ADD CONSTRAINT "CelebrationReactedUser_pkey" PRIMARY KEY ("reactionId");

-- AlterTable
ALTER TABLE "Request" DROP CONSTRAINT "Request_pkey",
DROP COLUMN "id",
ADD COLUMN     "requestId" SERIAL NOT NULL,
ADD CONSTRAINT "Request_pkey" PRIMARY KEY ("requestId");

-- AlterTable
ALTER TABLE "RequestTaggedUser" DROP CONSTRAINT "RequestTaggedUser_pkey",
DROP COLUMN "id",
ADD COLUMN     "tagId" SERIAL NOT NULL,
ADD CONSTRAINT "RequestTaggedUser_pkey" PRIMARY KEY ("tagId");

-- AlterTable
ALTER TABLE "SentimentMeter" DROP CONSTRAINT "SentimentMeter_pkey",
DROP COLUMN "id",
ADD COLUMN     "sentimentId" SERIAL NOT NULL,
ADD CONSTRAINT "SentimentMeter_pkey" PRIMARY KEY ("sentimentId");

-- CreateIndex
CREATE UNIQUE INDEX "Celebration_celebrationId_key" ON "Celebration"("celebrationId");

-- CreateIndex
CREATE UNIQUE INDEX "CelebrationReactedUser_reactionId_key" ON "CelebrationReactedUser"("reactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Request_requestId_key" ON "Request"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "RequestTaggedUser_tagId_key" ON "RequestTaggedUser"("tagId");

-- CreateIndex
CREATE UNIQUE INDEX "SentimentMeter_sentimentId_key" ON "SentimentMeter"("sentimentId");

-- AddForeignKey
ALTER TABLE "CelebrationReactedUser" ADD CONSTRAINT "CelebrationReactedUser_celebrationId_fkey" FOREIGN KEY ("celebrationId") REFERENCES "Celebration"("celebrationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestTaggedUser" ADD CONSTRAINT "RequestTaggedUser_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("requestId") ON DELETE RESTRICT ON UPDATE CASCADE;
