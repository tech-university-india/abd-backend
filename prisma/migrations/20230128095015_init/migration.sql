/*
  Warnings:

  - You are about to drop the column `jiraLink` on the `PONote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PONote" DROP COLUMN "jiraLink",
ADD COLUMN     "issueLink" TEXT;
