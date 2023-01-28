/*
  Warnings:

  - You are about to drop the `PoNotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PoNotes";

-- CreateTable
CREATE TABLE "PoNote" (
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
CREATE UNIQUE INDEX "PoNote_noteId_key" ON "PoNote"("noteId");
