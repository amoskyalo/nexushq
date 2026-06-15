/*
  Warnings:

  - A unique constraint covering the columns `[name,orgId]` on the table `departments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "DOCUMENT_TYPE" AS ENUM ('ID_CARD', 'PASSPORT', 'DRIVING_LICENSE');

-- CreateTable
CREATE TABLE "employees" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "departmentId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "docs" "DOCUMENT_TYPE" NOT NULL DEFAULT 'ID_CARD',
    "status" "STATUS" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "departments_name_orgId_key" ON "departments"("name", "orgId");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
