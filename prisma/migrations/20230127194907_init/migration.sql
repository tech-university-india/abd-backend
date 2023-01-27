-- CreateTable
CREATE TABLE "action_items" (
    "action_item_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "due_date" TIMESTAMP(3),
    "jira_link" TEXT,

    CONSTRAINT "action_items_pkey" PRIMARY KEY ("action_item_id")
);

-- CreateTable
CREATE TABLE "agenda_items" (
    "agenda_item_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "is_done" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agenda_items_pkey" PRIMARY KEY ("agenda_item_id")
);

-- CreateTable
CREATE TABLE "key_decisions" (
    "key_decision_id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "key_decisions_pkey" PRIMARY KEY ("key_decision_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "action_items_action_item_id_key" ON "action_items"("action_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "agenda_items_agenda_item_id_key" ON "agenda_items"("agenda_item_id");

-- CreateIndex
CREATE UNIQUE INDEX "key_decisions_key_decision_id_key" ON "key_decisions"("key_decision_id");
