/*
  Warnings:

  - You are about to drop the `action_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `agenda_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `key_decisions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('COMPLETED', 'PENDING');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('ACTION_ITEM', 'KEY_DECISION', 'AGEND_ITEM');

-- DropTable
DROP TABLE "action_items";

-- DropTable
DROP TABLE "agenda_items";

-- DropTable
DROP TABLE "key_decisions";

-- CreateTable
CREATE TABLE "PoNotes" (
    "noteId" SERIAL NOT NULL,
    "type" "Type" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "note" TEXT NOT NULL,
    "jiraLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "PoNotes_noteId_key" ON "PoNotes"("noteId");
