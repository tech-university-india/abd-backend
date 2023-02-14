-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('RESOURCE', 'MEETING');

-- CreateTable
CREATE TABLE "RequestTaggedUser" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "requestId" INTEGER NOT NULL,

    CONSTRAINT "RequestTaggedUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "author" INTEGER NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "type" "RequestType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RequestTaggedUser_id_key" ON "RequestTaggedUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Request_id_key" ON "Request"("id");

-- AddForeignKey
ALTER TABLE "RequestTaggedUser" ADD CONSTRAINT "RequestTaggedUser_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
