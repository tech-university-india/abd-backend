/*
  Warnings:

  - A unique constraint covering the columns `[userId,celebrationId]` on the table `CelebrationReactedUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CelebrationReactedUser_userId_celebrationId_key" ON "CelebrationReactedUser"("userId", "celebrationId");
