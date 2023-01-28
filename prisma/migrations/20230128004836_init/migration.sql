-- CreateTable
CREATE TABLE "action_items" (
    "id" SERIAL NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "jira_link" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3),
    "isValid" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "key_decisions" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "isValid" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "agenda_items" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isValid" BOOLEAN NOT NULL DEFAULT true
);

-- CreateIndex
CREATE UNIQUE INDEX "action_items_id_key" ON "action_items"("id");

-- CreateIndex
CREATE UNIQUE INDEX "key_decisions_id_key" ON "key_decisions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "agenda_items_id_key" ON "agenda_items"("id");
