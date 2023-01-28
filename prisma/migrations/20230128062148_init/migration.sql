/*
  Warnings:

  - You are about to drop the column `id` on the `action_items` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `agenda_items` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `key_decisions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[item_id]` on the table `action_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_id]` on the table `agenda_items` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_id]` on the table `key_decisions` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "action_items_id_key";

-- DropIndex
DROP INDEX "agenda_items_id_key";

-- DropIndex
DROP INDEX "key_decisions_id_key";

-- AlterTable
ALTER TABLE "action_items" DROP COLUMN "id",
ADD COLUMN     "item_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "agenda_items" DROP COLUMN "id",
ADD COLUMN     "item_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "key_decisions" DROP COLUMN "id",
ADD COLUMN     "item_id" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "action_items_item_id_key" ON "action_items"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "agenda_items_item_id_key" ON "agenda_items"("item_id");

-- CreateIndex
CREATE UNIQUE INDEX "key_decisions_item_id_key" ON "key_decisions"("item_id");
