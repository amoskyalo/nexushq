/*
  Warnings:

  - A unique constraint covering the columns `[employeeId,orgId]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeId` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "employeeId" TEXT NOT NULL,
ADD COLUMN     "reportsTo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "employees_employeeId_orgId_key" ON "employees"("employeeId", "orgId");
