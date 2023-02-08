/*
  Warnings:

  - You are about to alter the column `note` on the `PONote` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1500)`.

*/
-- AlterTable
ALTER TABLE "PONote" ALTER COLUMN "note" SET DATA TYPE VARCHAR(1500);
