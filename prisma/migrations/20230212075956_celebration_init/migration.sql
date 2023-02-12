-- CreateTable
CREATE TABLE "Celebration" (
    "celebrationId" SERIAL NOT NULL,
    "author" INTEGER NOT NULL,
    "content" VARCHAR(300) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Celebration_pkey" PRIMARY KEY ("celebrationId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Celebration_celebrationId_key" ON "Celebration"("celebrationId");
