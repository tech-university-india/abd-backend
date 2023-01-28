/*
  Warnings:

  - You are about to drop the `PoNote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PoNote";

-- CreateTable
CREATE TABLE "PONote" (
    "noteId" SERIAL NOT NULL,
    "type" "Type" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "note" TEXT NOT NULL,
    "issueLink" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "deleted" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "PONote_noteId_key" ON "PONote"("noteId");
