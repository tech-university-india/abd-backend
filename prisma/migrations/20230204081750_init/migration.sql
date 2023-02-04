/*
  Warnings:

  - You are about to drop the column `deleted` on the `PONote` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PONote" DROP COLUMN "deleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
